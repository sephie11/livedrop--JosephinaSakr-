from flask import Flask, request, jsonify
from src.llm import generate

app = Flask(__name__)

@app.route("/generate", methods=["POST"])
def generate_route():
    data = request.get_json(force=True) or {}
    prompt = data.get("prompt", "")
    max_tokens = int(data.get("max_tokens", 400))
    try:
        text = generate(prompt, max_tokens=max_tokens)
        return jsonify({"text": text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, host="0.0.0.0", debug=False)
