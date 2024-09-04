Story Creator - Add API


Story Creator is a web-based tool that uses OpenAI's GPT-3.5 model to generate short stories for children based on a prompt provided by the user. It also offers an illustration generation feature, which creates an image for the story in a style of your choice. This project serves as a creative resource for parents, teachers, and children to explore imaginative storytelling.

Features
Story Generation: Uses GPT-3.5 to generate short stories based on a user-provided prompt.
Illustration Generation: Generates a custom illustration for the story using OpenAI's image generation API.
RESTful API: Exposes an API to generate both stories and illustrations via POST requests.
Tech Stack
Backend: Flask
AI API: OpenAI (GPT-3.5 and DALL-E for image generation)
Environment Management: python-dotenv
Dependencies: Python, Flask, OpenAI, dotenv, requests, PIL (Python Imaging Library)
Installation
To run this project locally, follow these steps:

1. Clone the repository
bash
Copy code
git clone https://github.com/gianfrancomorini/Story-Creator-addAPI.git
cd Story-Creator-addAPI
2. Set up a virtual environment
bash
Copy code
python -m venv venv
source venv/bin/activate # On Windows, use 'venv\Scripts\activate'
3. Install the dependencies
bash
Copy code
pip install -r requirements.txt
4. Create a .env file
Create a .env file in the root of your project with the following content:

bash
Copy code
OPENAI_API_KEY=your-openai-api-key-here
5. Run the application
bash
Copy code
python app.py
6. Access the application
Once the app is running, you can access it at http://127.0.0.1:5000.

API Endpoints
1. Generate Story
URL: /generate-story
Method: POST
Content-Type: application/json
Body Parameters:
prompt: The story prompt (string)
Example Request:

json
Copy code
{
  "prompt": "two dogs playing ball"
}
Example Response:

json
Copy code
{
  "story": "Once upon a time, two playful dogs were having fun chasing a ball in the park..."
}
2. Generate Illustration
URL: /generate-illustration
Method: POST
Content-Type: application/json
Body Parameters:
story: The story to be illustrated (string)
style: The style of the illustration (string, optional, default: "cartoonish")
Example Request:

json
Copy code
{
  "story": "Once upon a time, two playful dogs were having fun chasing a ball in the park...",
  "style": "cartoonish"
}
Example Response:

json
Copy code
{
  "illustration": "<base64_encoded_image>"
}
The illustration will be returned as a base64-encoded string.

Requirements
Python 3.7+
OpenAI API Key
Running in Production
If you're deploying this application for production use, ensure that you're using a production-ready WSGI server (e.g., gunicorn) and disable Flask’s built-in debug mode.

Contributing
Feel free to open issues or submit pull requests for improvements or new features.

License
This project is licensed under the MIT License.

Notes:
Make sure to replace your-openai-api-key-here with your actual OpenAI API key in the .env file.
Customize the description or features based on your project needs.
