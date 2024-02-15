import { fetchProjectEdge } from "@/app/lib/http/project";
import { ProjectPage } from "@/app/projects/[uuid]/ProjectPage";
import { Metadata } from "next";

export const runtime = "edge";

export async function generateMetadata({
    params
}: { 
    params: {
        uuid: string;
    };
}) {
    const project = await fetchProjectEdge(params.uuid);

    return {
        title: `AwesomeMY - ${project.name}`,
        description: project.description,
        openGraph: {
            title: project.name,
            type: "website",
            url: `https://awesome-my.zackryrosli.com/projects/${project.uuid}`,
            siteName: "AwesomeMY",
        },
    } as Metadata;
}

export default function Page({
    params,
}: {
    params: {
        uuid: string;
    };
}) {    
    return (
        <ProjectPage uuid={params.uuid} />
    );
}