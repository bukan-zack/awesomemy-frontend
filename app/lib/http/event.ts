import { client } from "@/app/lib/http/client";
import { Pagination, rawIntoPagination } from "@/app/lib/http/pagination";

export interface Event {
    uuid: string;
    name: string;
    description: string;
    tags: string[];
    website: string | null;
    startsAt: Date;
    endsAt: Date;
    createdAt: Date;
}

export function rawIntoEvent(data: any) {
    return {
        uuid: data.uuid,
        name: data.name,
        description: data.description,
        tags: data.tags,
        website: data.website,
        startsAt: new Date(data.starts_at),
        endsAt: new Date(data.ends_at),
        createdAt: new Date(data.created_at),
    } as Event;
}

export function fetchEvents(page: number, limit: number) {
    return new Promise<{
        events: Event[];
        pagination: Pagination;
    }>((res, rej) => {
        client.get("/public/events", {
            params: {
                page: page,
                limit: limit,
            },
        })
            .then(({ data }) => res({
                events: data.items.map((rawEvent: any) => rawIntoEvent(rawEvent)),
                pagination: rawIntoPagination(data.pagination),
            }))
            .catch(rej);
    });
}

export function fetchEvent(uuid: string) {
    return new Promise<Event>((res, rej) => {
        client.get(`/public/events/${uuid}`)
            .then(({ data }) => res(rawIntoEvent(data.item)))
            .catch(rej);
    });
}
export function fetchEventEdge(uuid: string) {
    return new Promise<Event>((res, rej) => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/events/${uuid}`)
            .then((res) => res.json())
            .then((data) => res(rawIntoEvent(data.item)))
            .catch(rej);
    });
}

export function fetchUserEvents(page: number, limit: number) {
    return new Promise<{
        events: Event[];
        pagination: Pagination;
    }>((res, rej) => {
        client.get("/client/events", {
            params: {
                page: page,
                limit: limit,
            },
        })
            .then(({ data }) => res({
                events: data.items.map((rawEvent: any) => rawIntoEvent(rawEvent)),
                pagination: rawIntoPagination(data.pagination),
            }))
            .catch(rej);
    });
}

export function storeEvent({
    name,
    description,
    tags,
    website,
    startsAt,
    endsAt,
}: {
    name: string;
    description: string;
    tags: string[];
    website: string;
    startsAt: Date;
    endsAt: Date;
}) {
    return new Promise<Event>((res, rej) => {
        client.post("/client/events", {
            name: name,
            description: description,
            tags: tags,
            website: website,
            starts_at: startsAt,
            ends_at: endsAt,
        })
            .then(({ data }) => res(rawIntoEvent(data.item)))
            .catch(rej);
    }); 
}

export function updateEvent({
    uuid,
    name,
    description,
    tags,
    website,
    startsAt,
    endsAt,
}: {
    uuid: string;
    name: string;
    description: string;
    tags: string[];
    website: string;
    startsAt: Date;
    endsAt: Date;
}) {
    return new Promise<Event>((res, rej) => {
        client.post(`/client/events/${uuid}`, {
            name: name,
            description: description,
            tags: tags,
            website: website,
            starts_at: startsAt.toJSON(),
            ends_at: endsAt.toJSON(),
        })
            .then(({ data }) => res(rawIntoEvent(data.item)))
            .catch(rej);
    }); 
}

export function deleteEvent(uuid: string) {
    return new Promise<void>((res, rej) => {
        client.delete(`/client/events/${uuid}`)
            .then(() => res())
            .catch(rej);
    });
}