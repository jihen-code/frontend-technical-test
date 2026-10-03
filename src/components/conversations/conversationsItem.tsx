import { Conversation } from "@/types/conversation";
import styles from "@/styles/Conversations.module.css";
import { getConversationParticipant } from "@/utils/getConversationParticipant";
import { formatDateTime } from "@/utils/formatDateTime";

export function ConversationsItem({
    conversation,
    currentUserId,
}: {
    conversation: Conversation;
    currentUserId: number;
}) {
    const participant = getConversationParticipant(currentUserId, conversation);

    return (
        <li className={styles.conversationItem}>
            <span className={styles.avatar}>{participant.name.charAt(0)}</span>

            <span className={styles.conversationContent}>
                {participant.name}
                <span className={styles.dateTime}>
                    {formatDateTime(conversation.lastMessageTimestamp)}
                </span>
            </span>
        </li>
    );
}
