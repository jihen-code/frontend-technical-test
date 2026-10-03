import { getMessages } from "@/services/message.service";
import { Message } from "@/types/message";
import { useCallback, useEffect, useState } from "react";

export function useMessages(conversationId: number | null) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    console.log(conversationId);

    const loadMessages = useCallback(async () => {
        if (!conversationId) {
            setIsLoading(false);
            return;
        }

        try {
            const result = await getMessages(conversationId);
            setMessages(result.sort((a, b) => a.timestamp - b.timestamp));
        } catch (error) {
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    }, [conversationId]);

    useEffect(() => {
        loadMessages();
    }, [loadMessages]);

    return {
        messages,
        isLoading,
        error,
    };
}
