import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userInput, setUserInput] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    if (userInput === "") {
      setResponseMessage("");
    }
    setUserInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (userInput === "") {
        setResponseMessage("Please enter some text");
        return;
      }
      const response = await axios.post("http://127.0.0.1:5000/process", {
        input: userInput,
      });
      setResponseMessage(response.data.message);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>News Headline Prediction</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Enter some text"
            className="input-field"
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>

        {responseMessage && (
          <p className="output-label">Output: {responseMessage}</p>
        )}
      </div>
    </div>
  );
}

export default App;
