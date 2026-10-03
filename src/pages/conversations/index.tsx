import type { ReactElement } from "react";
import Head from "next/head";
import Image from "next/image";
import Logo from "@/assets/lbc-logo.webp";
import styles from "@/styles/Conversations.module.css";
import { useConversations } from "@/hooks/useConversations";
import { loggedUserId } from "../_app";
import { ConversationsItem } from "@/components/conversations/ConversationsItem";
import { Conversation } from "@/types/conversation";
import { ConversationsSkeleton } from "@/components/conversations/ConversationsSkeleton";

export default function Conversations(): ReactElement {
    const year = new Date().getFullYear();
    const { conversations, isLoading, error } = useConversations(loggedUserId);

    return (
        <div className={styles.container}>
            <Head>
                <title>Frontend Technical test - Leboncoin</title>
                <meta
                    name="description"
                    content="Frontend exercise for developpers who want to join us on leboncoin.fr"
                />
            </Head>

            <main className={styles.main}>
                <div className={styles.header}>
                    <Image
                        src={Logo}
                        alt="Leboncoin Frontend Team"
                        width={400}
                        height={125}
                        priority
                    />

                    <h1 className={styles.title}>Messagerie</h1>
                    <h2 className={styles.subTitle}>Conversations</h2>
                </div>

                {isLoading && <ConversationsSkeleton />}

                {error && (
                    <div className={styles.content}>
                        <p>Impossible de charger vos conversations</p>
                        <span>Le service est temporairement indisponible.</span>
                    </div>
                )}

                {!isLoading && !error && conversations.length === 0 && (
                    <div className={styles.content}>
                        <p>Aucune conversation</p>
                        <span>Vous n'avez pas encore de conversation</span>
                    </div>
                )}

                {conversations.length > 0 && (
                    <div className={styles.grid}>
                        <div className={styles.sidebar}>
                            <ul className={styles.conversationList}>
                                {conversations.map(
                                    (conversation: Conversation) => (
                                        <ConversationsItem
                                            key={conversation.id}
                                            conversation={conversation}
                                            currentUserId={loggedUserId}
                                        />
                                    ),
                                )}
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
            </main>

            <footer className={styles.footer}>&copy; leboncoin - {year}</footer>
        </div>
    );
}
