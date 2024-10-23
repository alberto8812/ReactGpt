

export const proConsStreamUseCase = async (promp: string) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discusser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: promp })
        });

        if (!response.ok) throw new Error("no se pudo realizar la correccion")

        const reader = response.body?.getReader();
        if (!reader) throw new Error("no se pudo realizar la correccion")

        // const decoder = new TextDecoder('utf-8');
        // let text = '';
        // while (true) {
        //     const { done, value } = await reader.read();
        //     if (done) break;
        //     text += decoder.decode(value);
        //     //es lo que estamos esperando lo que es un pedazo de texto
        //     const decodedChunk = decoder.decode(value, { stream: true });
        //     text += decodedChunk;
        //     console.log(decodedChunk)
        // }
        return reader;

    } catch (error) {
        return null
    }
}
