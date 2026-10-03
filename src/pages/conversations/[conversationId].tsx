import { useMessages } from "@/hooks/useMessages";
import { useRouter } from "next/router";
import { ReactElement, useMemo } from "react";
import styles from "@/styles/Messages.module.css";
import { Message } from "@/types/message";
import { MessageBubble } from "@/components/messages/MessageBubble";
import { loggedUserId } from "../_app";
import { MessagessSkeleton } from "@/components/messages/MessagesSkeleton";
import ErrorMessage from "@/components/ErrorMessage";

export default function ConversationPage(): ReactElement {
    const router = useRouter();
    const year = new Date().getFullYear();

    const conversationId = useMemo(() => {
        if (router.query.conversationId) {
            return Array.isArray(router.query.conversationId)
                ? Number(router.query.conversationId[0])
                : Number(router.query.conversationId);
        }
        return null;
    }, [router.query.conversationId]);

    const { messages, isLoading, error } = useMessages(conversationId);

    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.title}>Messagerie</h1>
                <h2 className={styles.subTitle}>Conversation</h2>
            </div>

            {isLoading && <MessagessSkeleton />}

            {error && (
                <ErrorMessage
                    error="Impossible de charger vos messages"
                    description="Le service est temporairement indisponible."
                />
            )}

            {!isLoading && !error && messages.length === 0 && (
                <ErrorMessage
                    error="Aucun message"
                    description="Vous pouvez envoyer un message pour commencer cette conversation."
                />
            )}

            {messages.length > 0 && (
                <div>
                    <ul className={styles.messagesList}>
                        {messages.map((message: Message) => (
                            <MessageBubble
                                key={message.id}
                                message={message}
                                currentUser={loggedUserId}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}
