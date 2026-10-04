import { useMessages } from "@/hooks/useMessages";
import { useRouter } from "next/router";
import { ReactElement, useMemo } from "react";
import styles from "@/styles/Messages.module.css";
import { Message } from "@/types/message";
import { MessageBubble } from "@/components/messages/MessageBubble";
import { loggedUserId } from "../_app";
import { MessagessSkeleton } from "@/components/messages/MessagesSkeleton";
import ErrorMessage from "@/components/ErrorMessage";
import Link from "next/link";
import { useConversations } from "@/hooks/useConversations";
import { getConversationParticipant } from "@/utils/getConversationParticipant";
import Header from "@/components/Header";

export default function ConversationPage(): ReactElement {
    const router = useRouter();

    const conversationId = useMemo(() => {
        if (router.query.conversationId) {
            return Array.isArray(router.query.conversationId)
                ? Number(router.query.conversationId[0])
                : Number(router.query.conversationId);
        }
        return null;
    }, [router.query.conversationId]);

    const { messages, isLoading, error } = useMessages(conversationId);
    const { conversations } = useConversations(loggedUserId);
    const conversation = conversations.find(
        (item) => item.id === conversationId,
    );
    const participant = conversation
        ? getConversationParticipant(loggedUserId, conversation)
        : null;

    return (
        <>
            <Header
                title="Conversation"
                subtitle={participant ? participant.name : "Chargement..."}
                participant={participant?.name}
                hasBackButton
            />

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
