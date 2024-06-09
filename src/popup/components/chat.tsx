import React from "react";

const BotMessage = ({ message, date }: { message: string; date: string }) => {
  return (
    <div className="flex flerr items-start gap-2.5">
      <div className="flex flex-col gap-1 w-full max-w-[320px]">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-600 ">Chatbot</span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-500">
            {date}
          </span>
        </div>
        <div className="flex flex-col leading-1.5 p-4 bg-gray-white border rounded-e-xl rounded-es-xl">
          <p className="text-sm font-normal text-gray-900">{message}</p>
        </div>
      </div>
    </div>
  );
};

const UserMessage = ({ message, date }: { message: string; date: string }) => {
  return (
    <div className="flex flex-row-reverse items-start gap-2.5">
      <div className="flex flex-col gap-1 w-full max-w-[320px]">
        <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-600 ">You</span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-500">
            {date}
          </span>
        </div>
        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-800 rounded-ee-xl rounded-s-xl">
          <p className="text-sm font-normal text-white">{message}</p>
        </div>
      </div>
    </div>
  );
};

export { BotMessage, UserMessage };
