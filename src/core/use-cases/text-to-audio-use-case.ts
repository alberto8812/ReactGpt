

export const textToAudioUseCase = async (promp: string, voice: string) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_GPT_API}/text-to-audio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: promp, voice })
        });

        if (!response.ok) throw new Error("no se pudo realizar la generacion del audio")

        // obtenemos la respuesta
        const audioFile = await response.blob(); // audio file
        // creamos un url para reproducir el audio
        const url = URL.createObjectURL(audioFile);

        return {
            ok: true,
            message: promp,
            audioUrl: url
        }
    } catch (error) {
        return {
            ok: false,
            message: "no se pudo realizar la generacion del audio",

        }
    }
}
