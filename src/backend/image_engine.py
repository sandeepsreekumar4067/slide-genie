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
        if os.path.isfile(item_path) or os.path.islink(item_path):  # Check if it's a file or symlink
            os.unlink(item_path)  # Remove file or symlink
        elif os.path.isdir(item_path):  # Check if it's a directory
            shutil.rmtree(item_path)  # Delete the directory and its contents


# Generate Slide JSON using content_generation
def generate_slide_json(title,number):
    try:
        slide_json = content_generation(input=title,number=number)
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
@app.route('/generate', methods=['POST'])
def generate():
    try:
        data = request.json
        title = data.get("title")
        number = data.get("number")

        if not title:
            return jsonify({"error": "Title is required"}), 400
        clear_folder("D:/python/slide generator/slide-genie/src/backend/generated_pictures")
        slide_json = generate_slide_json(title=title,number=number)
        if not slide_json:
            return jsonify({"error": "Failed to generate slides"}), 500
        # Extract prompts and generate images
        prompts = extract_image_prompts(slide_json)
        if not prompts:
            return jsonify({"message": "No image prompts found"}), 200

        for index, prompt in prompts:
            generate_and_save_image(prompt, index)

        return jsonify({"message": "Slides and images generated successfully!","slide_json":slide_json})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
