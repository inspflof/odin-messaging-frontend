import { useQuery } from "@tanstack/react-query";
import { api } from "../../../config/api";
import type { User } from "../../../types/user";

export function useSearchUser(username: string) {
    return useQuery({
        queryKey: ["searchUser", username.toLowerCase()],
        queryFn: async (): Promise<User[]> => {
            const res = await api.get("/user/search", {
                params: {
                    username
                }
            })
            return res.data
        },
        enabled: username.trim().length >= 1
    })
}