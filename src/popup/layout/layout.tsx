import React from "react";
import Message from "../components/message";
import { Logout } from "../icons";

const Layout = ({
  children,
  resetProfile,
  propagateUsrMsg,
}: {
  children: React.ReactNode;
  resetProfile: () => void;
  propagateUsrMsg: (msg: string) => void;
}) => {
  const logout = () => {
    chrome.runtime.sendMessage({ type: "logout" }, {}, async (response) => {
      console.log(response);
      if (response.success) {
        resetProfile();
      }
    });
  };

  return (
    <div className="flex flex-col h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between gap-2.5 overflow-y-auto p-2 shadow-sm">
        <div className="flex items-center gap-2.5">
          <img
            className="w-8 h-8 rounded-full"
            src="https://github.com/qudusayo.png"
            alt="Chatbot image"
          />
          <span className="text-sm font-semibold text-gray-600">Chatbot</span>
        </div>
        <button onClick={logout}>
          <Logout className="text-red-500 w-5 h-5" />
        </button>
      </div>

      {/* Chat Box */}
      <div className="flex-1 p-2">{children}</div>

      {/* Footer */}

      <Message propagateUsrMsg={propagateUsrMsg} />
    </div>
  );
};

export default Layout;
