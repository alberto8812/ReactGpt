import { useState } from "react";

interface Props {
  onSendMessage: (message: string, selectOption: string) => void;
  placeholder?: string;
  disabledCorrection?: boolean;
  options: Option[];
}

interface Option {
  id: string;
  text: string;
}

export const TextMessageBoxSelect = ({
  onSendMessage,
  placeholder,
  disabledCorrection = false,
  options,
}: Props) => {
  const [message, setMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim().length === 0) return;
    onSendMessage(message, selectedOption);
    setMessage("");
  };
  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >
      <div className="flex-grow ml-4">
        <div className="flex">
          <input
            type="text"
            className=" w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 h-10 pl-4"
            autoFocus
            name="message"
            placeholder={placeholder}
            autoComplete={disabledCorrection ? "on" : "off"}
            spellCheck={disabledCorrection ? true : false}
            autoCorrect={disabledCorrection ? "on" : "off"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <select
            name="select"
            className="w-2/5 ml-5 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 h-10 pl-4"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="">Seleccione</option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.text}
              </option>
            ))}
          </select>
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
