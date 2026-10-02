import { Conversation } from "@/types/conversation";
import { api } from "./api";

export function getConversations(userId: number) {
    return api<Conversation[]>(`/conversations/${userId}`);
}
