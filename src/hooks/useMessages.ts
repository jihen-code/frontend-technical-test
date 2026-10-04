import { getMessages } from "@/services/message.service";
import { Message } from "@/types/message";
import { useCallback, useEffect, useState } from "react";

export function useMessages(conversationId: number | null) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const loadMessages = useCallback(
        async (id: number | null) => {
            if (!id) {
                setIsLoading(false);
                setError(
                    new Error("La conversation spécifiée est introuvable."),
                );
                return;
            }

            try {
                const result = await getMessages(id);
                setMessages(result.sort((a, b) => a.timestamp - b.timestamp));
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        },
        [conversationId],
    );

    useEffect(() => {
        loadMessages(conversationId);
    }, [loadMessages]);

    return {
        messages,
        isLoading,
        error,
        loadMessages,
    };
}
