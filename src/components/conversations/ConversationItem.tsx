import { Conversation } from "@/types/conversation";
import styles from "@/styles/Conversations.module.css";
import { getConversationParticipant } from "@/utils/getConversationParticipant";
import { formatDateTime } from "@/utils/formatDateTime";

export function ConversationItem({
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

            <span className={styles.conversationParticipant}>
                {participant.name}
            </span>

            <span className={styles.dateTime}>
                {formatDateTime(conversation.lastMessageTimestamp)}
            </span>
        </li>
    );
}
