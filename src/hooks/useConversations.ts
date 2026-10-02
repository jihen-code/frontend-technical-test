import { getConversations } from "@/services/conversation.service";
import { Conversation } from "@/types/conversation";
import { useEffect, useState } from "react";

export function useConversations(userId: number) {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const loadConversations = async () => {
        try {
            const result = await getConversations(userId);
            setConversations(
                [...result].sort(
                    (a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp,
                ),
            );
        } catch (error) {
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadConversations();
    }, []);

    return { conversations, error, isLoading };
}
