import { client } from "./client";

export interface Project {
    uuid: string;
    name: string;
    description: string;
    tags: string[];
}

export function rawIntoProject(data: any) {
    return {
        uuid: data.uuid,
        name: data.name,
        description: data.description,
        tags: data.tags,
    } as Project;
}

export function fetchProjects(page: number) {
    return new Promise<Project[]>((res, rej) => {
        client.get("/public/projects", {
            params: {
                page: page,
            },
        })
            .then(({ data }) => res(data.items.map((rawProject: any) => rawIntoProject(rawProject))));
    });
}