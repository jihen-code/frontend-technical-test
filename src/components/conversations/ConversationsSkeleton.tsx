import styles from "@/styles/Conversations.module.css";

export function ConversationsSkeleton() {
    return (
        <div className={styles.grid} aria-label="Chargement des conversations">
            <div className={styles.sidebar}>
                <div className={styles.skeleton} />
                <div className={styles.skeleton} />
                <div className={styles.skeleton} />
            </div>
        </div>
    );
}
