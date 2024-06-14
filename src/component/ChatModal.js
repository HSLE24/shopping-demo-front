import React, { useState } from "react";
import "./Chat.css";
import api from "../utils/api";

const ChatModal = ({ closeModal, productId, stock }) => {
  const [chatHistory, setChatHistory] = useState([]);

  console.log(stock);

  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value);
  // };

  // const handleSubmit = async () => {
  //   try {
  //     if (inputValue.trim()) {
  //       const userMessage = { sender: "user", text: inputValue };
  //       const response = await api.post("/question", {
  //         user_input: inputValue,
  //         productId,
  //       });

  //       console.log(response);

  //       const botResponse = { sender: "bot", text: response.data.response }; // 여기에 실제 API 응답을 추가할 수 있습니다.
  //       setChatHistory([...chatHistory, userMessage, botResponse]);
  //       setInputValue("");
  //     }
  //   } catch (err) {
  //     console.log("ERROR: ", err);
  //   }
  // };
  const handleSubmit = async (inputValue) => {
    //console.log("Message sent:", inputValue);
    try {
      if (inputValue.trim()) {
        const userMessage = { sender: "user", text: inputValue };
        const response = await api.post("/question/Simple", {
          user_input: inputValue,
          productId,
        });

        //console.log(response);

        const botResponse = { sender: "bot", text: response.data.response }; // 여기에 실제 API 응답을 추가할 수 있습니다.
        setChatHistory([...chatHistory, userMessage, botResponse]);
      }
    } catch (err) {
      //console.log("ERROR: ", err);
    }
  };

  const handleKeywordClick = (keyword) => {
    //console.log(keyword);
    handleSubmit(keyword);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <div className="chat-history">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        {/* <div className="chat-input">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <button onClick={handleSubmit}>Send</button>
        </div> */}
        <div className="keyword-buttons">
          <button onClick={() => handleKeywordClick("재고")}>재고</button>
          <button onClick={() => handleKeywordClick("배송")}>배송</button>
          {Object.entries(stock).map(
            ([size, quantity]) =>
              quantity === 0 && (
                <button
                  key={size}
                  onClick={() => handleKeywordClick(`입고 요청: ${size}`)}
                >
                  입고 요청: {size.toUpperCase()}
                </button>
              )
          )}
          {/* Add more keyword buttons as needed */}
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
