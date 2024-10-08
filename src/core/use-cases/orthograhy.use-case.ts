import type { OrthoGraphyResponse } from "../../interface";

export const orthographyUseCase = async (promp: string) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_GPT_API}/ortography-check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: promp })
        });

        if (!response.ok) {
            return {
                ok: false,
                message: "no se pudo realizar la correccion",
                accuracy: 0,
                error: []
            }

        }
        const data = await response.json() as OrthoGraphyResponse

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
