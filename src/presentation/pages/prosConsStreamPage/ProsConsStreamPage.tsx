import { useRef, useState } from "react";
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from "../../components";
import {
  proConsStreamGeneratorUseCase,
  proConsStreamUseCase,
} from "../../../core";

interface Message {
  text: string;
  isGpt: boolean;
}

export const ProsConsStreamPage = () => {
  const abortController = useRef(new AbortController());
  const isRunning = useRef(false); //isRunning.current = true;
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message[]>([]);

  const handleSendMessage = (message: string) => {};

  const handlePost = async (text: string) => {
    /**
     * Si el usuario envia un mensaje mientras se esta realizando una peticion
     */
    if (isRunning.current) {
      abortController.current.abort();
      abortController.current = new AbortController();
    }

    setLoading(true);
    isRunning.current = true;
    setMessage((prev) => [...prev, { text: text, isGpt: false }]);

    //TODO: UseCase
    const stream = proConsStreamGeneratorUseCase(
      text,
      abortController.current.signal
    );
    setLoading(false);

    setMessage((messages) => [...messages, { text: "", isGpt: true }]);

    for await (const text of stream) {
      setMessage((messages) => {
        const newMessages = [...messages];
        newMessages[newMessages.length - 1].text = text;
        return newMessages;
      });
    }

    isRunning.current = false;
  };

  // generate messages
  // if (!reader) return alert("no se pudo realizar la correccion");
  // const decoder = new TextDecoder("utf-8");
  // let gptMessage = "";
  // setMessage((prev) => [...prev, { text: gptMessage, isGpt: true }]);
  // while (true) {
  //   const { done, value } = await reader.read();
  //   if (done) break;
  //   gptMessage += decoder.decode(value);
  //   //es lo que estamos esperando lo que es un pedazo de texto
  //   const decodedChunk = decoder.decode(value, { stream: true });
  //   gptMessage += decodedChunk;
  //   setMessage((message) => {
  //     const newMessage = [...message];
  //     newMessage[newMessage.length - 1].text = gptMessage;
  //     return newMessage;
  //   });
  // }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/*Bienbenida */}
          <GptMessage text="Que deseas comparar hoy?" />

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

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Escribe tu texto aqui"
        disabledCorrection={false}
      />
    </div>
  );
};
