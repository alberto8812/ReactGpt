import { useRef, useState } from "react";

interface Props {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabledCorrection?: boolean;
  accept?: string;
}

export const TextMessageBoxFile = ({
  onSendMessage,
  placeholder,
  disabledCorrection = false,
  accept,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [selectFile, setSelectFile] = useState<File | null>(null);

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
      <div className="mr-3">
        <button
          type="button"
          className="flex items-center justify-center text-gray-400 hover:text-gray-600"
          onClick={() => fileInputRef.current?.click()}
        >
          <i className="fa-solid fa-paperclip text-xl"> </i>
        </button>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          accept={accept}
          onChange={(e) => setSelectFile(e.target.files?.[0] || null)}
        />
      </div>
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
        <button className="btn-primary" disabled={!selectFile}>
          {!selectFile ? (
            <span className="mr-2 ">Enviar</span>
          ) : (
            <span className="mr-2 ">
              {selectFile?.name.substring(0, 10) + "..."}
            </span>
          )}
          <span className="mr-2 ">Enviar</span>
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};
