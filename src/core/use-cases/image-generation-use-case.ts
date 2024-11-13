type GenerateImage = Image | null;

interface Image {
    url: string;
    alt: string;
}

export const imagegenrationUseCase = async (prompt: string, originalImage?: string, maskImage?: string): Promise<GenerateImage> => {
    try {

        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/image-generation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt, originalImage, maskImage }),
        });

        const { url, revisesed_promp } = await resp.json();
        return { url, alt: revisesed_promp };



    } catch (e) {
        console.error(e);
        return null;

    }
}