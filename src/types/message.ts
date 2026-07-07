export type Message = {
    id: string;
    content: string;
    createdAt: string;
    editedAt: string | null;
    deletedAt: string | null;
    conversationId: string;
    userId: string;
    replyToId: string | null;
}