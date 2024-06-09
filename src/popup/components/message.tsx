import React, { useState } from "react";
import { Send } from "../icons";

const Message = ({
  propagateUsrMsg,
}: {
  propagateUsrMsg: (msg: string) => void;
}) => {
  const [message, setMessage] = useState("");

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    propagateUsrMsg(message);
    setMessage("");
  };

  return (
    <form onSubmit={sendMessage}>
      <label className="border-t border-gray-100 flex items-center gap-2.5 p-2">
        <input
          className="w-full p-2 rounded-lg outline-none text-sm"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gray-800 hover:bg-gray-900 p-2 rounded-lg text-white flex items-center justify-center"
        >
          <Send className="h-5 w-5" />
        </button>
      </label>
    </form>
  );
};

export default Message;
