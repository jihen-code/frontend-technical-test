import { Message } from "@/types/message";
import { api } from "./api";

export function getMessages(conversationId: number) {
    return api<Message[]>(`/messages/${conversationId}`);
}
