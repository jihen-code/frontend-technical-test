import { getConversationParticipant } from "../getConversationParticipant";

describe("Finding participant name in the conversation", () => {
    it("should return the participant name and id", () => {
        const conversation = {
            id: 2,
            lastMessageTimestamp: 1620284667,
            recipientId: 3,
            recipientNickname: "Patrick",
            senderId: 1,
            senderNickname: "Thibaut",
        };

        const expected = {
            id: 3,
            name: "Patrick",
        };

        expect(getConversationParticipant(1, conversation)).toEqual(expected);
    });
});
