import { useState } from "react";
import {
  GptMessage,
  GptMessageAudio,
  MyMessage,
  TextMessageBox,
  TextMessageBoxSelect,
  TypingLoader,
} from "../../components";
import { textToAudioUseCase } from "../../../core";

const displayMessage = `## Que audio queremos generar hoy?
* Todo el audio generado espor GPT-4
`;

const voices = [
  { id: "nova", text: "Nova" },
  { id: "alloy", text: "Alloy" },
  { id: "echo", text: "Echo" },
  { id: "fable", text: "Fable" },
  { id: "onyx", text: "Onyx" },
  { id: "shimmer", text: "Shimmer" },
];

interface TextMessage {
  text: string;
  isGpt: boolean;
  type: "text";
}

interface AudioMessage {
  text: string;
  isGpt: boolean;
  audio: string;
  type: "audio";
}

type Message = TextMessage | AudioMessage;
export const TextToAudioPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message[]>([]);

  const handleSendMessage = (message: string) => {};

  const handlePost = async (text: string, selectVoice: string) => {
    setLoading(true);
    setMessage((prev) => [...prev, { text, isGpt: false, type: "text" }]);
    //use case

    const { ok, message, audioUrl } = await textToAudioUseCase(
      text,
      selectVoice
    );

    if (!ok) return;

    setMessage((prev) => [
      ...prev,
      {
        text: `${selectVoice}-${message}`,
        isGpt: true,
        audio: audioUrl!,
        type: "audio",
      },
    ]);
    setLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/*Bienbenida */}
          <GptMessage text={displayMessage} />

          {message.map((m, index) =>
            m.isGpt ? (
              m.type === "audio" ? (
                <GptMessageAudio key={index} text={m.text} audio={m.audio} />
              ) : (
                <GptMessage key={index} text={m.text} />
              )
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
        options={voices}
      />
    </div>
  );
};
