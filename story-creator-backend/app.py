from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
import logging
from PIL import Image
import io
import base64
import requests
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.DEBUG)

# Load environment variables from .env file
load_dotenv()

# Set OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

@app.route('/generate-story', methods=['POST'])
def generate_story():
    app.logger.info('Received request for story generation')
    data = request.json
    prompt = data.get('prompt', '')
    app.logger.info(f'Prompt received: {prompt}')

    if not prompt:
        app.logger.error('No prompt provided')
        return jsonify({'error': 'No prompt provided'}), 400

    try:
        app.logger.info('Sending request to OpenAI')
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{'role': 'user', 'content': f"Write a short story for children based on the following prompt: {prompt}"}],
            max_tokens=500,
            n=1,
            stop=None,
            temperature=0.7,
        )
        story = response['choices'][0]['message']['content'].strip()
        app.logger.info('Successfully generated story')
        return jsonify({'story': story})
    except Exception as e:
        app.logger.error(f'Error occurred: {str(e)}')
        return jsonify({'error': str(e)}), 500

@app.route('/generate-illustration', methods=['POST'])
def generate_illustration():
    app.logger.info('Received request for illustration generation')
    data = request.json
    story = data.get('story', '')
    style = data.get('style', 'cartoonish')
    app.logger.info(f'Story received, Style: {style}')

    if not story:
        app.logger.error('No story provided')
        return jsonify({'error': 'No story provided'}), 400

    try:
        app.logger.info('Sending request to OpenAI for image generation')
        response = openai.Image.create(
            prompt=f"Create a {style} illustration for a children's story: {story[:100]}",  # Using first 100 characters as prompt
            n=1,
            size="512x512"
        )
        
        image_url = response['data'][0]['url']
        app.logger.info('Successfully generated illustration')
        
        # Convert the image URL to base64 for easy transmission
        image_data = requests.get(image_url).content
        base64_image = base64.b64encode(image_data).decode('utf-8')
        
        return jsonify({'illustration': base64_image})
    except Exception as e:
        app.logger.error(f'Error occurred: {str(e)}')
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
