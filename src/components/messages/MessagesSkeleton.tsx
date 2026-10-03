import styles from "@/styles/Messages.module.css";

export function MessagessSkeleton() {
    return (
        <div
            className={styles.messagesList}
            aria-label="Chargement des messages"
        >
            <div
                className={`${styles.messageSkeleton} ${styles.participant}`}
            />
            <div
                className={`${styles.messageSkeleton} ${styles.participant}`}
            />
            <div className={`${styles.messageSkeleton} ${styles.own}`} />
        </div>
    );
}
