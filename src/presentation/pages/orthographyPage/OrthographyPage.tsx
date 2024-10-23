import { useState } from "react";
import {
  GptMessage,
  GptOrthograpyMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from "../../components";
import { orthographyUseCase } from "../../../core";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    error: string[];
    message: string;
  };
}

export const OrthographyPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setLoading(true);
    setMessage((prev) => [...prev, { text, isGpt: false }]);
    //use case
    setLoading(false);
    const data = await orthographyUseCase(text);
    if (!data.ok) {
      setMessage((prev) => [
        ...prev,
        { text: `no se pudo realizar la correccion`, isGpt: true },
      ]);
    } else {
      setMessage((prev) => [
        ...prev,
        {
          text: data.message,
          isGpt: true,
          info: {
            error: data.error,
            message: data.message,
            userScore: data.accuracy,
          },
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/*Bienbenida */}
          <GptMessage text="Hola, Puedes escribir tu texto en espanol, y te ayudo con tus correcciones" />

          {message.map((m, index) =>
            m.isGpt ? (
              <GptOrthograpyMessage
                key={index}
                error={m.info?.error || []}
                message={m.info?.message || ""}
                userScore={m.info?.userScore || 0}
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
