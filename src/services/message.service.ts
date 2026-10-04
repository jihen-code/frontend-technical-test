import { Message } from "@/types/message";
import { api } from "./api";

export function getMessages(conversationId: number) {
    return api<Message[]>(`/messages/${conversationId}`);
}

export function addMessage(message: Omit<Message, "id">) {
    return api(`/messages/${message.conversationId}`, {
        method: "POST",
        body: JSON.stringify({
            ...message,
        }),
    });
}
