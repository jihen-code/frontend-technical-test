import { Conversation } from "@/types/conversation";
import styles from "@/styles/Conversations.module.css";

export function ConversationsItem({
    conversation,
    currentUserId,
}: {
    conversation: Conversation;
    currentUserId: number;
}) {
    const participantName =
        conversation.senderId !== currentUserId
            ? conversation.senderNickname
            : conversation.recipientNickname;

    return (
        <li className={styles.conversationItem}>
            <span className={styles.avatar}>{participantName.charAt(0)}</span>

            <span className={styles.conversationContent}>
                {participantName}
                <span className={styles.dateTime}>
                    {conversation.lastMessageTimestamp}
                </span>
            </span>
        </li>
    );
}
