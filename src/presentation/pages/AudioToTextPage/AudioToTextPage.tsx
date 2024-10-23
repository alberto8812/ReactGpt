import { useState } from "react";
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TextMessageBoxFile,
  TypingLoader,
} from "../../components";
import { audioToTextUseCase } from "../../../core";

interface Message {
  text: string;
  isGpt: boolean;
}

export const AudioToTextPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message[]>([]);

  const handleSendMessage = (message: string, audioFile: File) => {};

  const handlePost = async (text: string, audioFile: File) => {
    console.log(text, audioFile);
    setLoading(true);
    setMessage((prev) => [...prev, { text, isGpt: false }]);
    //use case
    const resp = await audioToTextUseCase(text, audioFile);
    setLoading(false);

    if (!resp) {
      return;
    }
    const gptMessage = `
    ## El texto original es:
    __Duration:__${Math.floor(resp.duration)} segundos__
    ### El texto transcrito es:
    ${resp.text}
    `;
    setMessage((prev) => [...prev, { text: gptMessage, isGpt: true }]);

    for (const segment of resp.segments) {
      const gptMessage = `
  __De ${Math.floor(segment.start)} a ${Math.floor(segment.end)} segundos:__
      ${segment.text}`;
      setMessage((prev) => [...prev, { text: gptMessage, isGpt: true }]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/*Bienbenida */}
          <GptMessage text="Hola, Puedes escribir tu texto en espanol, y te ayudo con tus correcciones" />

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

      <TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder="Escribe tu texto aqui"
        disabledCorrection={false}
        accept="audio/*"
      />
    </div>
  );
};
