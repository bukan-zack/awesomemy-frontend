import { client } from "@/app/lib/http/client";

export interface User {
    uuid: string;
    githubEmail: string;
    createdAt: Date;
}

export function rawIntoUser(data: any) {
    return {
        uuid: data.uuid,
        githubEmail: data.github_email,
        createdAt: new Date(data.created_at),
    } as User;
}

export function fetchAuthenticatedUser() {
    return new Promise<User>((res, rej) => {
        client.get("/client/account")
            .then(({ data }) => res(rawIntoUser(data.item)))
            .catch(rej);
    });
}

export function logoutUser() {
    return new Promise<void>((res, rej) => {
        client.post("/auth/logout")
            .then(() => res())
            .catch(rej);
    });
}