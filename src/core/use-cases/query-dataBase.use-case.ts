type GenerateImage = Image | ErrorResponse | null;

interface Image {
    url: string;
    alt: string;
}

interface ErrorResponse {
    ok: boolean;
    message: string;
    accuracy: number;
    error: any[];
}

export const queryDatabaseUserCase = async (prompt: string): Promise<any> => {
    console.log("queryDatabaseUserCase")
    try {
        const response = await fetch(`${import.meta.env.VITE_GPT_APIS}/sam-sistant/human-query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question: prompt, threadId: 'carlos' })
        });

        if (!response.status) {
            return {
                ok: false,
                message: "no se pudo realizar la correccion",
                accuracy: 0,
                error: []
            }

        }
        const data = await response.json()
        console.log(data, "data")
        return {
            ok: true,
            ...data
        }
    } catch (error) {
        return {
            ok: false,
            message: "no se pudo realizar la correccion",
            accuracy: 0,
            error: []
        }
    }
}