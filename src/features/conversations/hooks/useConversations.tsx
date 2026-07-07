import { api } from "../../../config/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Conversation } from "../../../types/conversation";

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