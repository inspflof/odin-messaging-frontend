import { api } from "../../../config/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Conversation } from "../../../types/conversation";
import type { Message } from "../../../types/message";

export function useGetConversations() {
    return useQuery({
        queryKey: ["conversations"],
        queryFn: async ():Promise<Conversation[]> => {
            const res = await api.get("/conversation")
            return res.data
        }
    })
}

export function useCreateConversation() {
    return useMutation({
        mutationFn: ({ userIds, name }: { userIds: string[], name: string }) =>
            api.post("/conversation", {
                userIds,
                name
            })
    })
}

export function useGetMessages(conversationId: string) {
    return useQuery({
        queryKey: ["messages", conversationId],
        queryFn: async ():Promise<Message[]> => {
            const res = await api.get(`/conversation/${conversationId}/message`)
            return res.data
        }
    })
}

export function useAddMessage() {
    return useMutation({
        mutationFn: ({ conversationId, message }: { conversationId: string, message: string }) =>
            api.post(`/conversation/${conversationId}/message`, {
                contents: [message]
            })
    })
}