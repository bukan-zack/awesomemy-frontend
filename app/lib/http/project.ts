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

export function fetchProjects(page: number) {
    return new Promise<{
        projects: Project[];
        pagination: Pagination;
    }>((res, rej) => {
        client.get("/public/projects", {
            params: {
                page: page,
            },
        })
            .then(({ data }) => res({
                projects: data.items.map((rawProject: any) => rawIntoProject(rawProject)),
                pagination: rawIntoPagination(data.pagination),
            }))
            .catch(rej);
    });
}