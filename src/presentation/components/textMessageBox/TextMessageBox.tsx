import { useState } from "react";

interface Props {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabledCorrection?: boolean;
}

export const TextMessageBox = ({
  onSendMessage,
  placeholder,
  disabledCorrection = false,
}: Props) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim().length === 0) return;
    onSendMessage(message);
    setMessage("");
  };
  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >
      <div className="flex-grow ml-4">
        <div className="relative  w-full">
          <input
            type="text"
            className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 h-10 pl-4"
            autoFocus
            name="message"
            placeholder={placeholder}
            autoComplete={disabledCorrection ? "on" : "off"}
            spellCheck={disabledCorrection ? true : false}
            autoCorrect={disabledCorrection ? "on" : "off"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
      <div className="ml-4 ">
        <button className="btn-primary">
          <span className="mr-2 ">Enviar</span>
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};
