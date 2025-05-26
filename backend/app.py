from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import pickle
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np


model = tf.keras.models.load_model("../../model.h5")
with open('../../label_encoder.pkl', 'rb') as f:
    label_encoder = pickle.load(f)

# Load the saved Tokenizer
with open('../../tokenizer.pkl', 'rb') as f:
    tokenizer = pickle.load(f)


app = Flask(__name__)
CORS(app)

@app.route('/process', methods=['POST'])
def process_input():
    # Get data from the POST request
    data = request.get_json()
    
    # Check if the 'input' field is in the data
    user_input = data.get('input', '')
    
    sequence = tokenizer.texts_to_sequences([user_input])
    
    padded_sequence = pad_sequences(sequence, maxlen=100, padding='post')
    
    prediction = model.predict(padded_sequence)[0]
    
    predicted_class_index = np.argmax(prediction)
    predicted_class_label = label_encoder.inverse_transform([predicted_class_index])[0]
    
    # Return the response as JSON
    return jsonify({'message': predicted_class_label})

if __name__ == '__main__':
    app.run(debug=True)
