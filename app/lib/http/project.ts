import { client } from "@/app/lib/http/client";
import { Pagination, rawIntoPagination } from "@/app/lib/http/pagination";

export interface Project {
    uuid: string;
    name: string;
    description: string;
    tags: string[];
    createdAt: Date;
}

export function rawIntoProject(data: any) {
    return {
        uuid: data.uuid,
        name: data.name,
        description: data.description,
        tags: data.tags,
        createdAt: new Date(data.created_at),
    } as Project;
}

export function fetchProjects(page: number, limit: number) {
    return new Promise<{
        projects: Project[];
        pagination: Pagination;
    }>((res, rej) => {
        client.get("/public/projects", {
            params: {
                page: page,
                limit: limit,
            },
        })
            .then(({ data }) => res({
                projects: data.items.map((rawProject: any) => rawIntoProject(rawProject)),
                pagination: rawIntoPagination(data.pagination),
            }))
            .catch(rej);
    });
}

export function fetchProject(uuid: string) {
    return new Promise<Project>((res, rej) => {
        client.get(`/public/projects/${uuid}`)
            .then(({ data }) => res(rawIntoProject(data.item)))
            .catch(rej);
    });
}

export function fetchUserProjects(page: number, limit: number) {
    return new Promise<{
        projects: Project[];
        pagination: Pagination;
    }>((res, rej) => {
        client.get("/client/projects", {
            params: {
                page: page,
                limit: limit,
            },
        })
            .then(({ data }) => res({
                projects: data.items.map((rawProject: any) => rawIntoProject(rawProject)),
                pagination: rawIntoPagination(data.pagination),
            }))
            .catch(rej);
    });
}

export function fetchUserProject(uuid: string) {
    return new Promise<Project>((res, rej) => {
        client.get(`/client/projects/${uuid}`)
            .then(({ data }) => res(rawIntoProject(data.item)))
            .catch(rej);
    });
}