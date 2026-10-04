import { useMessages } from "@/hooks/useMessages";
import { useRouter } from "next/router";
import { FormEvent, ReactElement, useMemo, useState } from "react";
import styles from "@/styles/Messages.module.css";
import { Message } from "@/types/message";
import { MessageBubble } from "@/components/messages/MessageBubble";
import { loggedUserId } from "../_app";
import { MessagessSkeleton } from "@/components/messages/MessagesSkeleton";
import ErrorMessage from "@/components/ErrorMessage";
import { useConversations } from "@/hooks/useConversations";
import { getConversationParticipant } from "@/utils/getConversationParticipant";
import Header from "@/components/Header";
import { useAddMessage } from "@/hooks/useAddMessage";

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

    const { messages, isLoading, error, loadMessages } =
        useMessages(conversationId);
    const { conversations } = useConversations(loggedUserId);
    const { isLoading: isSendingMessage, addMessage } = useAddMessage();
    const conversation = conversations.find(
        (item) => item.id === conversationId,
    );
    const participant = conversation
        ? getConversationParticipant(loggedUserId, conversation)
        : null;
    const [value, setValue] = useState<string>("");

    const onMessageSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (value.length > 0 && conversationId) {
            await addMessage({
                conversationId,
                body: value.trim(),
                timestamp: Math.floor(Date.now() / 1000),
                authorId: loggedUserId,
            });

            await loadMessages(conversationId);

            setValue("");
        }
    };

    return (
        <>
            <Header
                title="Conversation"
                subtitle={
                    error
                        ? ""
                        : participant
                          ? participant.name
                          : "Chargement..."
                }
                participant={participant?.name}
                hasBackButton
            />

            {isLoading && <MessagessSkeleton />}

            {error && (
                <ErrorMessage
                    error="Impossible de charger vos messages"
                    description={error.message}
                />
            )}

            {!isLoading && !error && messages.length === 0 && (
                <ErrorMessage
                    error="Aucun message"
                    description="Vous pouvez envoyer un message pour commencer cette conversation."
                />
            )}

            <div className={styles.messagesContainer}>
                {messages.length > 0 && (
                    <ul className={styles.messagesList}>
                        {messages.map((message: Message) => (
                            <MessageBubble
                                key={message.id}
                                message={message}
                                currentUser={loggedUserId}
                            />
                        ))}
                    </ul>
                )}
            </div>

            <form className={styles.form} onSubmit={onMessageSubmit}>
                <textarea
                    value={value}
                    placeholder="Message..."
                    onChange={(e) => {
                        setValue(e.target.value.slice(0, 1000));
                    }}
                />
                <button type="submit" disabled={isSendingMessage}>
                    {isSendingMessage ? "Envoi..." : "Envoyer"}
                </button>
            </form>
        </>
    );
}
