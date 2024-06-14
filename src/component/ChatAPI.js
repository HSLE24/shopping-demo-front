import React, { useState } from "react";
import ChatModal from "./ChatModal";
import "./Chat.css";

const ChatAPI = ({ productId, stock }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="scroll-container">
      <div className="ask-comp" onClick={openModal}>
        ASK
      </div>
      {isModalOpen && (
        <ChatModal
          closeModal={closeModal}
          productId={productId}
          stock={stock}
        />
      )}
    </div>
  );
};

export default ChatAPI;
