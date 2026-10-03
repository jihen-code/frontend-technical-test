import { useMessages } from "@/hooks/useMessages";
import { useRouter } from "next/router";
import { ReactElement, useMemo } from "react";
import styles from "@/styles/Conversations.module.css";
import Head from "next/head";
import Image from "next/image";
import Logo from "@/assets/lbc-logo.webp";
import messageStyles from "@/styles/Messages.module.css";
import { Message } from "@/types/message";
import { MessageBubble } from "@/components/messages/MessageBubble";
import { loggedUserId } from "../_app";
import { MessagessSkeleton } from "@/components/messages/MessagesSkeleton";

export default function ConversationPage(): ReactElement {
    const router = useRouter();
    const year = new Date().getFullYear();

    const conversationId = useMemo(() => {
        if (router.query.conversationId) {
            return Array.isArray(router.query.conversationId)
                ? Number(router.query.conversationId[0])
                : Number(router.query.conversationId);
        }
        return null;
    }, [router.query.conversationId]);

    const { messages, isLoading, error } = useMessages(conversationId);

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
                    <h2 className={styles.subTitle}>Conversation</h2>
                </div>

                {isLoading && <MessagessSkeleton />}

                {error && (
                    <div className={styles.content}>
                        <p>Impossible de charger vos messages</p>
                        <span>Le service est temporairement indisponible.</span>
                    </div>
                )}

                {!isLoading && !error && messages.length === 0 && (
                    <div className={styles.content}>
                        <p>Aucun message</p>
                        <span>
                            Vous pouvez envoyer un message pour commencer cette
                            conversation
                        </span>
                    </div>
                )}

                {messages.length > 0 && (
                    <div>
                        <ul className={messageStyles.messagesList}>
                            {messages.map((message: Message) => (
                                <MessageBubble
                                    key={message.id}
                                    message={message}
                                    currentUser={loggedUserId}
                                />
                            ))}
                        </ul>
                    </div>
                )}
            </main>

            <footer className={styles.footer}>&copy; leboncoin - {year}</footer>
        </div>
    );
}
