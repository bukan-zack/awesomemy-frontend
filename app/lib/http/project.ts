import { client } from "@/app/lib/http/client";
import { Pagination, rawIntoPagination } from "@/app/lib/http/pagination";

export interface Project {
    uuid: string;
    name: string;
    description: string;
    tags: string[];
    repository: string | null;
    website: string | null;
    createdAt: Date;
}

export function rawIntoProject(data: any) {
    return {
        uuid: data.uuid,
        name: data.name,
        description: data.description,
        tags: data.tags,
        repository: data.repository,
        website: data.website,
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
export function fetchProjectEdge(uuid: string) {
    return new Promise<Project>((res, rej) => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/projects/${uuid}`)
            .then((res) => res.json().then((data) => data).catch((error) => console.error(error)))
            .then((data) => res(rawIntoProject(data.item)))
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

export function storeProject({
    name,
    description,
    tags,
    repository,
    website,
}: {
    name: string;
    description: string;
    tags: string[];
    repository: string;
    website: string;
}) {
    return new Promise<Project>((res, rej) => {
        client.post("/client/projects", {
            name: name,
            description: description,
            tags: tags,
            repository: repository,
            website: website,
        })
            .then(({ data }) => res(rawIntoProject(data.item)))
            .catch(rej);
    }); 
}

export function updateProject({
    uuid,
    name,
    description,
    tags,
    repository,
    website,
}: {
    uuid: string;
    name: string;
    description: string;
    tags: string[];
    repository: string;
    website: string;
}) {
    return new Promise<Project>((res, rej) => {
        client.post(`/client/projects/${uuid}`, {
            name: name,
            description: description,
            tags: tags,
            repository: repository,
            website: website,
        })
            .then(({ data }) => res(rawIntoProject(data.item)))
            .catch(rej);
    }); 
}

export function deleteProject(uuid: string) {
    return new Promise<void>((res, rej) => {
        client.delete(`/client/projects/${uuid}`)
            .then(() => res())
            .catch(rej);
    });
}