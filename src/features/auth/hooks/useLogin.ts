import { useMutation } from "@tanstack/react-query";
import { api } from "../../../config/api";

export function useLogin() {
    return useMutation({
        mutationFn: ({ username, password }: { username: string, password: string }) => 
            api.post("/auth", {
                username,
                password
            })
    })
}

export function useSignup() {
    return useMutation({
        mutationFn: ({ username, displayName, password }: { username: string, displayName: string, password: string }) => 
            api.post("/user", {
                displayName,
                username,
                password
            })
    })
}