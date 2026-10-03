import { Message } from "@/types/message";
import styles from "@/styles/Messages.module.css";
import { formatDateTime } from "@/utils/formatDateTime";

export function MessageBubble({
    message,
    currentUser,
}: {
    message: Message;
    currentUser: number;
}) {
    const isOwnMessage = currentUser === message.authorId;

    return (
        <li
            className={`${styles.messageBubble} ${isOwnMessage ? styles.own : styles.participant}`}
        >
            <span className={styles.body}>{message.body}</span>
            <span className={styles.time}>
                {formatDateTime(message.timestamp)}
            </span>
        </li>
    );
}
