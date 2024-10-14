

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
        const reader = response.body?.getReader();
        if (!reader) {
            console.log('No se pudo generar el reader');
            return null
        }
        const decoder = new TextDecoder();

        let text = '';

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