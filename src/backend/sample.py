from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO
import os
from dotenv import load_dotenv
from GPT_engine import content_generation
import shutil

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "*"}})

# Load API Key from .env
load_dotenv()
GEMINI_API = os.getenv("GEMINI_API")
client = genai.Client(api_key=GEMINI_API)

# Ensure output directory exists
output_folder = "D:/python/slide generator/slide-genie/src/backend/generated_pictures"
os.makedirs(output_folder, exist_ok=True)


def clear_folder(folder_path):
    for item in os.listdir(folder_path):  # List all items in the folder
        item_path = os.path.join(folder_path, item)
        if os.path.isfile(item_path) or os.path.islink(
            item_path
        ):  # Check if it's a file or symlink
            os.unlink(item_path)  # Remove file or symlink
        elif os.path.isdir(item_path):  # Check if it's a directory
            shutil.rmtree(item_path)  # Delete the directory and its contents


# Generate Slide JSON using content_generation
def generate_slide_json(title, number):
    try:
        slide_json = content_generation(input=title, number=number)
        print("Slide JSON generated successfully.")
        return slide_json
    except Exception as e:
        print(f"Error generating slides: {e}")
        return None


# Extract Image Prompts from JSON
def extract_image_prompts(slide_json):
    prompts = []
    slides = slide_json.get("slides", [])
    for index, slide in enumerate(slides):
        if slide["type_id"] in ["left-image-text", "right-image-text"]:
            prompt = slide["inputs"].get("image_prompt", "")
            if prompt:
                prompts.append((index, prompt))
    return prompts


# Generate and Save Images using Gemini
def generate_and_save_image(prompt, slide_index):
    try:
        print(f"Generating image for Slide {slide_index + 1}...")
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp-image-generation",
            contents=prompt,
            config=types.GenerateContentConfig(response_modalities=["Text", "Image"]),
        )

        # Process and Save Image
        for part in response.candidates[0].content.parts:
            if part.inline_data is not None:
                image = Image.open(BytesIO(part.inline_data.data))
                image_path = os.path.join(output_folder, f"slide_{slide_index + 1}.png")
                image.save(image_path)
                print(f"Image saved: {image_path}")
    except Exception as e:
        print(f"Error generating image for Slide {slide_index + 1}: {e}")


# API Endpoint to Generate Slides and Images
@app.route("/generate", methods=["POST"])
def generate():
    return jsonify({"message": "success"}), 200


# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)


"""
{'slides': [{'type_id': 'title', 'inputs': {'title': 'Albert Einstein: A Genius of the 20th Century', 'subtitle': 'Exploring the Life and Legacy of a Revolutionary Physicist'}}, {'type_id': 'left-image-text', 'inputs': {'title': 'Early Life and Education', 'image_prompt': 'A young Albert Einstein sitting at a desk, looking thoughtful, with books and papers scattered around him. The background shows a classroom setting.', 'body': 'Born in Ulm, Germany, in 1879, Einstein showed an early curiosity about mathematics and physics. Despite some initial struggles in formal education, he excelled in these subjects and later attended the Swiss Federal Polytechnic in Zurich.'}}, {'type_id': 'right-image-text', 'inputs': {'title': 'The Annus Mirabilis Papers', 'image_prompt': "A stylized depiction of four scientific papers floating in the air, each representing one of Einstein's groundbreaking discoveries from 1905. The papers are surrounded by mathematical equations and symbols.", 'body': 'In 1905, Einstein published four groundbreaking papers that revolutionized physics. These papers covered Brownian motion, the photoelectric effect, special relativity, and mass-energy equivalence (E=mc²).'}}, {'type_id': 'left-image-text', 'inputs': {'title': 'General Relativity: A New Theory of Gravity', 'image_prompt': 'A curved space-time diagram with a planet causing the curvature. Light bends around the planet, illustrating the concept of gravitational lensing.', 'body': "Einstein's theory of general relativity, published in 1915, redefined our understanding of gravity. It describes gravity not as a force, but as a curvature of spacetime caused by mass and energy."}}, {'type_id': 'right-image-text', 'inputs': {'title': 'Nobel Prize and Later Years', 'image_prompt': 'Albert Einstein receiving the Nobel Prize from a Swedish official. He is wearing a suit and has a thoughtful expression on his face.', 'body': 'Einstein was awarded the Nobel Prize in Physics in 1921 for his explanation of the photoelectric effect. He spent his later years working on a unified field theory and advocating for peace and social justice.'}}, {'type_id': 'title-sub-text', 'inputs': {'title': "Einstein's Enduring Legacy", 'subtitle': 'A Lasting Impact on Science and Society', 'body': "Albert Einstein's contributions to physics have profoundly shaped our understanding of the universe. His theories continue to be tested and refined, and his work has paved the way for countless technological advancements. Beyond his scientific achievements, Einstein was a passionate advocate for peace and a symbol of intellectual curiosity and brilliance."}}]}


"""
