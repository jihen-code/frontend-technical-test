import type { ReactElement } from "react";
import styles from "@/styles/Conversations.module.css";
import { useConversations } from "@/hooks/useConversations";
import { loggedUserId } from "../_app";
import { ConversationItem } from "@/components/conversations/ConversationItem";
import { Conversation } from "@/types/conversation";
import { ConversationsSkeleton } from "@/components/conversations/ConversationsSkeleton";
import ErrorMessage from "@/components/ErrorMessage";

export default function Conversations(): ReactElement {
    const year = new Date().getFullYear();
    const { conversations, isLoading, error } = useConversations(loggedUserId);

    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.title}>Messagerie</h1>
                <h2 className={styles.subTitle}>Conversations</h2>
            </div>

            {isLoading && <ConversationsSkeleton />}

            {error && (
                <ErrorMessage
                    error="Impossible de charger vos conversations"
                    description="Le service est temporairement indisponible."
                />
            )}

            {!isLoading && !error && conversations.length === 0 && (
                <ErrorMessage
                    error="Aucune conversation"
                    description="Vous n'avez pas encore de conversation."
                />
            )}

            {conversations.length > 0 && (
                <div className={styles.grid}>
                    <div className={styles.sidebar}>
                        <ul className={styles.conversationList}>
                            {conversations.map((conversation: Conversation) => (
                                <ConversationItem
                                    key={conversation.id}
                                    conversation={conversation}
                                    currentUserId={loggedUserId}
                                />
                            ))}
                        </ul>
                    </div>

                    <div className={styles.conversationContent}>
                        <p>Sélectionnez une conversation</p>
                        <span>
                            Choisissez une conversation dans la liste pour
                            consulter vos messages
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}
