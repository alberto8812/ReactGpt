type GenerateImage = Image | null;

interface Image {
    url: string;
    alt: string;
}

export const imageVariationUseCase = async (originalImage: string): Promise<GenerateImage> => {
    try {
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/image-generation-variation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ baseImage: originalImage }),
        });

        const { url, revisesed_promp } = await resp.json();
        return { url, alt: revisesed_promp };



    } catch (e) {
        console.error(e);
        return null;

    }
}