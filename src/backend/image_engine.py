from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO
import base64
from dotenv import load_dotenv
import os
from GPT_engine import content_generation

load_dotenv()
GEMINI_API = os.getenv("GEMINI_API")
client = genai.Client(api_key=GEMINI_API)

title = str(input("Enter the description of the image : "))

contents = title

response = client.models.generate_content(
    model="gemini-2.0-flash-exp-image-generation",
    contents=contents,
    config=types.GenerateContentConfig(response_modalities=["Text", "Image"]),
)

for part in response.candidates[0].content.parts:
    if part.text is not None:
        print(part.text)
    elif part.inline_data is not None:
        image = Image.open(BytesIO((part.inline_data.data)))
        image.save("gemini-native-image.png")
        image.show()
