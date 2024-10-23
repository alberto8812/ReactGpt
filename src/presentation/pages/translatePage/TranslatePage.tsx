import { useRef, useState } from "react";
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TextMessageBoxSelect,
  TypingLoader,
} from "../../components";
import { translatetextUserCase } from "../../../core/use-cases/translate-stream.use-case";

interface Message {
  text: string;
  isGpt: boolean;
}

const languages = [
  { id: "alemán", text: "Alemán" },
  { id: "árabe", text: "Árabe" },
  { id: "bengalí", text: "Bengalí" },
  { id: "francés", text: "Francés" },
  { id: "hindi", text: "Hindi" },
  { id: "inglés", text: "Inglés" },
  { id: "japonés", text: "Japonés" },
  { id: "mandarín", text: "Mandarín" },
  { id: "portugués", text: "Portugués" },
  { id: "ruso", text: "Ruso" },
];

export const TranslatePage = () => {
  const abortController = useRef(new AbortController());
  const isRunning = useRef(false); //isRunning.current = true;
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message[]>([]);

  const handleSendMessage = (message: string) => {};

  const handlePost = async (text: string, selectOptions: string) => {
    if (isRunning.current) {
      abortController.current.abort();
      abortController.current = new AbortController();
    }
    setLoading(true);
    isRunning.current = true;
    const newMessage = `Traducir "${text}" al idioma "${selectOptions}"`;
    setMessage((prev) => [...prev, { text: newMessage, isGpt: false }]);
    //use case
    const streamPromise = translatetextUserCase(
      text,
      selectOptions,
      abortController.current.signal
    );
    setLoading(false);
    setMessage((messages) => [...messages, { text: "", isGpt: true }]);
    if (streamPromise) {
      // eslint-disable-next-line no-restricted-syntax,usado para iterar sobre un objeto iterable
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
      for await (const text of streamPromise) {
        console.log("text", text);
        setMessage((messages) => {
          const newMessages = [...messages];
          newMessages[newMessages.length - 1].text = text;
          return newMessages;
        });
      }
    }
    isRunning.current = false;
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/*Bienbenida */}
          <GptMessage text="Que quieres que traduzca hoy?" />

          {message.map((m, index) =>
            m.isGpt ? (
              <GptMessage key={index} text={m.text} />
            ) : (
              <MyMessage key={index} text={m.text} />
            )
          )}

          {isLoading && (
            <div className="fade-in col-start-1 col-end-12 ">
              <TypingLoader className="fade-in" />
            </div>
          )}
        </div>
      </div>

      <TextMessageBoxSelect
        onSendMessage={handlePost}
        placeholder="Escribe tu texto aqui"
        options={languages}
      />
    </div>
  );
};
