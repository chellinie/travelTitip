from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import json
import os
import requests
from dotenv import load_dotenv

load_dotenv()
GROQ_API_KEY = os.getenv('GROQ_API_KEY')
GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app) # Initialize CORS right after app creation

@app.route('/')
def home():
    return render_template('home.html')
CORS(app)

@app.route('/api/data')
def get_app_data():
    """
    This endpoint loads all necessary data from data.js and serves it as JSON.
    This is a more robust way to load data than relying on script tags and global variables.
    """
    try:
        data_js_path = os.path.join(app.static_folder, 'data.js')
        with open(data_js_path, 'r', encoding='utf-8') as f:
            js_content = f.read()
            # Replace JS variable declarations with JSON key-value pairs
            json_str = js_content.replace('const sellers = ', '"sellers": ').replace('const currentUser = ', '"currentUser": ').replace('const orders = ', '"orders": ').replace('const messages = ', '"messages": ').replace('const notifications = ', '"notifications": ').replace('let shoppingCart = ', '"shoppingCart": ').replace(';', ',')
            # Remove the last comma if it exists and wrap in braces to form a valid JSON object
            json_str = f"{{{json_str.strip().rstrip(',')}}}"
            return jsonify(json.loads(json_str))
    except Exception as e:
        print(f"Error reading or parsing data.js: {e}")
        return jsonify({"error": "Could not load application data."}), 500

@app.route('/api/search', methods=['POST'])
def api_search():
    try:
        data = request.get_json()
        prompt = data.get('prompt')
        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400

        system_prompt = (
            "You are an assistant for a travel shopping app. "
            "Given a user's search query, identify travel destinations. "
            "Reply ONLY with a valid JSON object with two keys: "
            "'explanation': a short, friendly summary for the user about the destinations found, and "
            "'keywords': a list of single-word, lowercase keywords for each destination and its country (e.g., 'tokyo', 'japan', 'seoul', 'korea'). "
            "Do not include greetings, markdown, or any extra text. If no destination is found, return an empty keywords list."
        )

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ]
        payload = {
            "model": "llama-3.1-8b-instant",
            "messages": messages,
            "max_tokens": 256,
            "temperature": 0.7
        }
        headers = {"Authorization": f"Bearer {GROQ_API_KEY}", "Content-Type": "application/json"}
        
        response = requests.post(GROQ_API_URL, headers=headers, json=payload)
        if response.status_code != 200:
            print(f"Groq API error: {response.text}")
            return jsonify({"error": "Failed to get response from Groq API."}), 500
            
        result = response.json()
        ai_response_content = result["choices"][0]["message"]["content"].strip()
        if ai_response_content.startswith("```json"):
            ai_response_content = ai_response_content[7:-3].strip()
        ai_json = json.loads(ai_response_content)

        # Load seller data and find matches
        # Correctly locate data.js inside the 'static' folder
        data_js_path = os.path.join(app.static_folder, 'data.js')
        with open(data_js_path, 'r', encoding='utf-8') as f:
            js_content = f.read()
            json_str = js_content.split('const sellers = ')[1].split(';')[0]
            sellers_data = json.loads(json_str)

        keywords = set(ai_json.get('keywords', []))
        matched_seller_ids = []
        if keywords:
            for seller in sellers_data:
                destination_lower = seller['travelDestination'].lower()
                if any(keyword in destination_lower for keyword in keywords):
                    matched_seller_ids.append(seller['id'])

        return jsonify({"explanation": ai_json.get('explanation', ''), "seller_ids": matched_seller_ids})

    except json.JSONDecodeError:
        print(f"Invalid JSON from Groq: {ai_response_content}")
        return jsonify({"error": "The AI model did not return valid JSON. Please try again."}), 500
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An internal server error occurred"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
