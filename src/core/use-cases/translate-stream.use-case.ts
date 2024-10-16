
/**
 * function to translate text using a stream es un function generator
 * @param promp 
 * @param selectOptions 
 * @param abortSignal 
 * @returns 
 */
export async function* translatetextUserCase(promp: string, selectOptions: string, abortSignal: AbortSignal) {

    try {
        const response = await fetch(`${import.meta.env.VITE_GPT_API}/translate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: promp, leng: selectOptions }),
            signal: abortSignal,
        });

        if (!response.ok) throw new Error('No se pudo realizar la traducción');
        // reader para leer la respuesta el getReader() es un metodo de la interfaz ReadableStream
        // https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/getReader
        const reader = response.body?.getReader();
        if (!reader) {
            console.log('No se pudo generar el reader');
            return null
        }
        /*
        TextDecoder() es un metodo de la interfaz TextDecoder, el cual se utiliza para convertir un Uint8Array en una cadena de texto
        */
        const decoder = new TextDecoder();

        let text = '';

        // read() es un metodo de la interfaz ReadableStreamBYOBReader, el cual se utiliza para leer el contenido de un stream
        while (true) {
            const { value, done } = await reader.read();
            if (done) {
                break;
            }

            const decodedChunk = decoder.decode(value, { stream: true });
            text += decodedChunk;
            // console.log(text);
            yield text;
        }

    } catch (error) {
        return null
    }

}