from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO
import os
from dotenv import load_dotenv
from GPT_engine import content_generation

# Load environment variables
load_dotenv()
GEMINI_API = os.getenv("GEMINI_API")
client = genai.Client(api_key=GEMINI_API)

# Ensure the output directory exists
output_folder = "generated_pictures"
os.makedirs(output_folder, exist_ok=True)

# Generate Slide JSON using content_generation()
def generate_slide_json():
    title = str(input("Enter the description for the presentation: "))
    slide_json = content_generation(title)
    print("Slide JSON generated successfully.")
    return slide_json

# Extract image prompts from the JSON
def extract_image_prompts(slide_json):
    prompts = []
    slides = slide_json.get("slides", [])
    for index, slide in enumerate(slides):
        if slide["type_id"] in ["left-image-text", "right-image-text"]:
            prompt = slide["inputs"].get("image_prompt", "")
            if prompt:
                prompts.append((index, prompt))
    return prompts

# Generate images using Gemini and save to folder
def generate_and_save_image(prompt, slide_index):
    try:
        print(f"Generating image for Slide {slide_index + 1}...")
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp-image-generation",
            contents=prompt,
            config=types.GenerateContentConfig(response_modalities=["Text", "Image"]),
        )

        # Process the response and save the image
        for part in response.candidates[0].content.parts:
            if part.inline_data is not None:
                image = Image.open(BytesIO(part.inline_data.data))
                image_path = os.path.join(output_folder, f"slide_{slide_index + 1}.png")
                image.save(image_path)
                print(f"Image saved: {image_path}")
    except Exception as e:
        print(f"Error generating image for Slide {slide_index + 1}: {e}")

# Main function to manage the workflow
def main():
    slide_json = generate_slide_json()
    prompts = extract_image_prompts(slide_json)
    
    if not prompts:
        print("No image prompts found in the generated slides.")
        return
    
    for index, prompt in prompts:
        generate_and_save_image(prompt, index)

    print("All images generated and saved in the 'generated_pictures' folder.")

if __name__ == "__main__":
    main()
