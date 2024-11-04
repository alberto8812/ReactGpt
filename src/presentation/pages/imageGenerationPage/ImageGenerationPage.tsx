import { useState } from "react";
import {
  GptMessage,
  GptMessageImage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from "../../components";
import { imagegenrationUseCase } from "../../../core";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    url: string;
    alt: string;
  };
}

export const ImageGenerationPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message[]>([]);

  const handleSendMessage = (message: string) => {};

  const handlePost = async (text: string) => {
    setLoading(true);
    setMessage((prev) => [...prev, { text, isGpt: false }]);
    //use case
    const imageInfo = await imagegenrationUseCase(text);
    setLoading(false);
    if (!imageInfo) {
      return setMessage((prev) => [
        ...prev,
        { text: "No se puedo generar el error", isGpt: true },
      ]);
    }
    setMessage((prev) => [
      ...prev,
      {
        text: text,
        isGpt: true,
        info: {
          url: imageInfo.url,
          alt: imageInfo.alt,
        },
      },
    ]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/*Bienbenida */}
          <GptMessage text="Que Imagen deseas generar hoy?" />

          {message.map((m, index) =>
            m.isGpt ? (
              <GptMessageImage
                key={index}
                text={m.text}
                imageurl={m.info?.url ?? ""}
                alt={m.info?.alt ?? ""}
              />
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
