import type { ReactElement } from "react";
import Head from "next/head";
import Image from "next/image";
import Logo from "@/assets/lbc-logo.webp";
import styles from "@/styles/Conversations.module.css";
import { useConversations } from "@/hooks/useConversations";
import { loggedUserId } from "../_app";
import { ConversationsItem } from "@/components/conversations/conversationsItem";
import { Conversation } from "@/types/conversation";

export default function Conversations(): ReactElement {
    const year = new Date().getFullYear();
    const { conversations } = useConversations(loggedUserId);

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

                <div className={styles.grid}>
                    <div className={styles.sidebar}>
                        <ul className={styles.conversationList}>
                            {conversations.map((conversation: Conversation) => (
                                <ConversationsItem
                                    key={conversation.id}
                                    conversation={conversation}
                                    currentUserId={loggedUserId}
                                />
                            ))}
                        </ul>
                    </div>
                    <div className={styles.content}>
                        <p>Sélectionnez une conversation</p>
                        <span>
                            Choisissez une conversation dans la liste pour
                            consulter vos messages
                        </span>
                    </div>
                </div>
            </main>

            <footer className={styles.footer}>&copy; leboncoin - {year}</footer>
        </div>
    );
}
