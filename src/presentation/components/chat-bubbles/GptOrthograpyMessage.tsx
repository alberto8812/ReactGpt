import Markdown from "react-Markdown";

interface Props {
  userScore: number;
  error: string[];
  message: string;
}

export const GptOrthograpyMessage = ({ userScore, error, message }: Props) => {
  return (
    <div className="col-start-1 col-end-9 p3 rounded-lg">
      <div className="flex items-start flex-row">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
          G
        </div>
        <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
          <h3> Puntaje: {userScore} %</h3>
          <p>{message}</p>
          {error.length === 0 ? (
            <p>No se encontraron Errores</p>
          ) : (
            <>
              <h3 className="text-2xl ">Errores entrontradados</h3>
              <ul>
                {error.map((e, index) => (
                  <li key={index}>
                    <Markdown>{e}</Markdown>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
