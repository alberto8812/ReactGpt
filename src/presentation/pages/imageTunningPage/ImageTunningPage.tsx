import { useState } from "react";
import {
  GptMessage,
  GptMessageImage,
  GptMessageSelectableImage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from "../../components";
import { imagegenrationUseCase, imageVariationUseCase } from "../../../core";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    url: string;
    alt: string;
  };
}

export const ImageTunningPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message[]>([
    {
      isGpt: true,
      text: "imagen base",
      info: {
        url: "http://localhost:3000/gpt/image-generation/1730258209494.png",
        alt: "imagen base",
      },
    },
  ]);
  const [originalImageMask, setOriginalImageMask] = useState({
    orginal: undefined as string | undefined,
    mask: undefined as string | undefined,
  });

  const handleVariation = async (text: string) => {
    setLoading(true);
    setMessage((prev) => [
      ...prev,
      {
        text: text,
        isGpt: false,
      },
    ]);
    const { orginal, mask } = originalImageMask;
    const resp = await imagegenrationUseCase(text, orginal, mask);
    setLoading(false);
    if (!resp) {
      return setMessage((prev) => [
        ...prev,
        { text: "No se puedo generar el error", isGpt: true },
      ]);
    }
    setMessage((prev) => [
      ...prev,
      {
        text: "Variacion de la imagen",
        isGpt: true,
        info: {
          url: resp.url,
          alt: resp.alt,
        },
      },
    ]);
  };

  const handleSendMessage = (message: string) => {};

  const handlePost = async (text: string) => {
    setLoading(true);
    setMessage((prev) => [...prev, { text, isGpt: false }]);
    //use case
    const { orginal, mask } = originalImageMask;
    const imageInfo = await imagegenrationUseCase(text, orginal, mask);
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
    <>
      {originalImageMask.orginal && (
        <div className="fixed flex flex-col items-center top-10 right-10 z-10 fade-in">
          <span className="text-white text-lg font-semibold">Editando</span>
          <img
            className="w-36 h-36 rounded-xg object-contain "
            src={originalImageMask.mask ?? originalImageMask.orginal}
            alt="Original"
          />
          {/* <button
            className="bg-blue-500 text-white px-2 py-1 rounded-md mt-2"
            onClick={handleVariation}
          >
            Generar Variacion
          </button> */}
        </div>
      )}
      <div className="chat-container">
        <div className="chat-messages">
          <div className="grid grid-cols-12 gap-y-2">
            {/*Bienbenida */}
            <GptMessage text="Que Imagen deseas generar hoywww?" />

            {message.map((m, index) =>
              m.isGpt ? (
                <GptMessageSelectableImage
                  key={index}
                  text={m.text}
                  imageUrl={m.info?.url ?? ""}
                  alt={m.info?.alt ?? ""}
                  onImageSelected={(url) =>
                    setOriginalImageMask({
                      orginal: m.info?.url,
                      mask: url,
                    })
                  }
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
    </>
  );
};
