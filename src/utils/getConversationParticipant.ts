import { Conversation } from "@/types/conversation";

type ConversationParticipant = {
    id: number;
    name: string;
};

export function getConversationParticipant(
    currentUserId: number,
    conversation: Conversation,
): ConversationParticipant {
    if (conversation.recipientId === currentUserId) {
        return {
            id: conversation.senderId,
            name: conversation.senderNickname,
        };
    }

    return {
        id: conversation.recipientId,
        name: conversation.recipientNickname,
    };
}
