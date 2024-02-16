import { fetchEventEdge } from "@/app/lib/http/event";
import { EventPage } from "@/app/events/[uuid]/EventPage";
import { Metadata } from "next";

export const runtime = "edge";

export async function generateMetadata({
    params
}: { 
    params: {
        uuid: string;
    };
}) {
    const event = await fetchEventEdge(params.uuid);

    return {
        title: `AwesomeMY - ${event.name}`,
        description: event.description,
        openGraph: {
            title: event.name,
            type: "website",
            url: `https://awesome-my.zackryrosli.com/events/${event.uuid}`,
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
        <EventPage uuid={params.uuid} />
    );
}