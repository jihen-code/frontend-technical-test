import { addMessage } from "@/services/message.service";
import { Message } from "@/types/message";
import { useState } from "react";

export function useAddMessage() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const addNewMessage = async (message: Omit<Message, "id">) => {
        setIsLoading(true);
        setError(null);

        try {
            await addMessage(message);
        } catch (error) {
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        error,
        addMessage: addNewMessage,
    };
}
