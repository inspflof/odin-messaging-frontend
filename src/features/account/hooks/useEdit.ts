import { useMutation } from "@tanstack/react-query";
import { api } from "../../../config/api";

export default function useEdit() {
    return useMutation({
        mutationFn: ({ username, displayName }: { username: string | undefined, displayName: string | undefined }) => 
            api.put("/user", {
                username,
                displayName
            })
    })
}