import type { User } from "./user";

export type Conversation = {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string | null;
    type: "DIRECT" | "GROUP";
    users: User[];
}