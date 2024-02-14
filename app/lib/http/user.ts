import { client } from "@/app/lib/http/client";

export interface User {
    uuid: string;
    githubEmail: string;
}

export function rawIntoUser(data: any) {
    return {
        uuid: data.uuid,
        githubEmail: data.github_email,
    } as User;
}

export function fetchAuthenticatedUser() {
    return new Promise<User>((res, rej) => {
        client.get("/client/account")
            .then(({ data }) => res(rawIntoUser(data.item)))
            .catch(rej);
    });
}