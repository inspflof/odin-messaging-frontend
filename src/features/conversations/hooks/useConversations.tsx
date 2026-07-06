import { api } from "../../../config/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function useConversations() {
    const getAll = useQuery({
        queryKey: ["conversations"],
        queryFn: () => api.get("/conversation")
    })

    const create = useMutation({
        mutationFn: ({ userIds, name }: { userIds: string[], name: string }) =>
            api.post("/conversation", {
                userIds,
                name
            })
    })

    return { getAll, create }
}