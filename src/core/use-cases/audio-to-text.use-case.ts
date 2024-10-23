import type { IAudtioToTextResponseTs, OrthoGraphyResponse } from "../../interface";

export const audioToTextUseCase = async (prompt: string, audioFile: File) => {

    try {
        const formData = new FormData();
        formData.append('file', audioFile);
        if (prompt) {

            formData.append('prompt', prompt);
        }

        const response = await fetch(`${import.meta.env.VITE_GPT_API}/audio-to-text`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json() as IAudtioToTextResponseTs
        return data
    } catch (error) {
        console.error(error)
        return null;
        // return {
        //     ok: false,
        //     message: "no se pudo realizar la correccion",
        //     accuracy: 0,
        //     error: []
        // }
    }
}
