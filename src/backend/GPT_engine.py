# import openai
import flask
import json
from dotenv import load_dotenv
from google import genai
import os
from google.genai import types
load_dotenv()
# Load environment variables from .env file
GEMINI_API=os.getenv("GEMINI_API")
client = genai.Client(api_key=GEMINI_API)


def content_generation(input):
    prompt = f""" Imagine you are an AI Slides generating tool called 'SlidesGenie'. Based on the input of the user, create the structure of the slides presentation as a JSON object.
    You have 4 slide formats at your disposal to use. Each slide has a type_id and takes different inputs. Slides with images have a special input called image_prompt. This should be a description of an image that can be generated using a text-to-image model. The description should match with the contents of the slide. The slide formats are:
    1. Title Slide
    The title slide consists of a title and a subtitle.
    type_id: title
    inputs: title, subtitle
    2. Slide with Image on Left
    The slide consists of an image on the left, a title on the right, and a body of text under the title.
    type_id: left-image-text
    inputs: title, image_prompt, body.
    3. Slide with Image on Right
    The slide consists of an image on the right, a title on the left, and a body of text under the title.
    type_id: right-image-text
    inputs: title, image_prompt, body.
    4. Slide with Only Text
    The slide consists of a title, subtitle, and body.
    type_id: title-sub-text
    inputs: title, subtitle, body

    Template:
    {{
      "slides": [
        {{
          "type_id": "title",
          "inputs": {{
            "title": "<insert-title>",
            "subtitle": "<insert-subtitle-here>"
          }}
        }},
        {{
          "type_id": "left-image-text",
          "inputs": {{
            "title": "<insert-title>",
            "image_prompt": "<insert-image-generating-prompt>",
            "body": "<insert-body>"
          }}
        }},
        {{
          "type_id": "right-image-text",
          "inputs": {{
            "title": "<insert-title>",
            "image_prompt": "<insert-image-generating-prompt>",
            "body": "<insert-body>"
          }}
        }},
        {{
          "type_id": "title-sub-text",
          "inputs": {{
            "title": "<insert-title>",
            "subtitle": "<insert-subtitle>",
            "body": "<insert-body>"
          }}
        }}
      ]
    }}
    The above JSON contains a list of the 4 slide templates: title, left-image-text, right-image-text, and title-sub-text. Use this to create 10 slides. For each slide, pick an appropriate slide template from the 4 templates given in the JSON and generate the response. Be creative and factual with the content. Comply with the user's input. 
    RESPOND WITH JSON ONLY
    This is the subject you have to make slides based on the prompt: {input}
    """
    try:
    
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
            config=types.GenerateContentConfig(temperature=0.1),
        )
        response_text=response.text
        response_text = response_text.replace('json','')  # Remove first 4 characters ("json")
        response_text=response_text.replace('```','')
        # Convert cleaned response to JSON
        slides_data = json.loads(response_text)
        # print(slides_data)
        return slides_data

    except Exception as e:
        print(f"Error during content generation: {e}")
