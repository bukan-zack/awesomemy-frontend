"use client";

import { Spinner } from "@/app/components/Spinner";
import { TransitionWrapper } from "@/app/components/TransitionWrapper";
import { humanizeError } from "@/app/lib/http/error";
import { Event, deleteEvent, fetchEvent, updateEvent } from "@/app/lib/http/event";
import clsx from "clsx";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface EventInput {
    name: string;
    description: string;
    tags: string[];
    website: string;
    startsAt: Date;
    endsAt: Date;
}

export const runtime = "edge";

export default function Page() {
    const router = useRouter();
    const { uuid } = useParams<{
        uuid: string;
    }>();
    const { handleSubmit, register } = useForm<EventInput>();
    const [loading, setLoading] = useState<boolean>(true);
    const [event, setEvent] = useState<Event>({} as Event);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [inputTag, setInputTag] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);

    function handleDeletion() {
        deleteEvent(event.uuid)
            .then(() => router.push("/dashboard/events"));
    }

    function onSubmit(data: EventInput) {
        setSubmitting(true);

        updateEvent({
            uuid: event.uuid,
            name: data.name,
            description: data.description,
            tags: tags,
            website: data.website,
            startsAt: new Date(),
            endsAt: new Date(),
        })  
            .then(() => toast.info("You have successfully updated the event details."))
            .catch((error) => toast.error(humanizeError(error)))
            .finally(() => setSubmitting(false));
    }

    useEffect(() => {
        fetchEvent(uuid)
            .then((event) => {
                setEvent(event);
                setTags(event.tags);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);
    
    return (
        <main className="max-w-6xl mx-auto px-8 flex py-10 flex-col justify-center">
            {loading ? <Spinner centered /> : (
                <TransitionWrapper>
                    <Link href="/dashboard/events" className="mb-6 transition duration-500 ease-in-out text-white/50 hover:text-white/70 flex flex-row gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18">
                            </path>
                        </svg>
                        Events
                    </Link>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">
                                Name
                            </label>
                            <input
                                className="rounded-lg px-4 py-2 transition duration-500 ease-in-out bg-transparent border outline-none border-white/20 hover:border-white/50 focus:border-white/50"
                                placeholder="Name"
                                defaultValue={event.name}
                                {...register("name")}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="description">
                                Description
                            </label>
                            <textarea
                                className="rounded-lg px-4 py-2 transition duration-500 ease-in-out bg-transparent border outline-none border-white/20 hover:border-white/50 focus:border-white/50"
                                placeholder="Description"
                                defaultValue={event.description}
                                {...register("description")}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="tags">
                                Tags
                            </label>
                            <div className="flex flex-row gap-2">
                                {tags.map((tag, ix) => (
                                    <button
                                        type="button"
                                        className="flex flex-row gap-2 items-center px-4 py-1 border border-white/10 rounded-md"
                                        key={ix} 
                                        onClick={() => setTags(tags.filter((item) => item !== tag))}
                                    >
                                        {tag}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24">
                                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12">
                                            </path>
                                        </svg>
                                    </button>
                                ))}
                            </div>
                            <div className="flex flex-row gap-4 justify-between">
                                <input
                                    className="w-full rounded-lg px-4 py-2 transition duration-500 ease-in-out bg-transparent border outline-none border-white/20 hover:border-white/50 focus:border-white/50"
                                    placeholder="Tag"
                                    onChange={(e) => setInputTag(e.target.value)}
                                />
                                <button
                                    disabled={submitting}
                                    type="button"
                                    onClick={() => inputTag !== "" && setTags([...tags, inputTag])}
                                    className={clsx("bg-white rounded-lg text-black px-4 py-2", submitting && "bg-opacity-80")}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="website">
                                Website
                            </label>
                            <input
                                className="rounded-lg px-4 py-2 transition duration-500 ease-in-out bg-transparent border outline-none border-white/20 hover:border-white/50 focus:border-white/50"
                                placeholder="Website"
                                defaultValue={event.website ?? ""}
                                {...register("website")}
                            />
                        </div>
                        <div className="flex flex-row gap-4 self-end">
                            <button type="button" onClick={() => handleDeletion()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0">
                                    </path>
                                </svg>
                            </button>
                            <button disabled={submitting} type="submit" className={clsx("bg-white rounded-lg text-black px-4 py-2", submitting && "bg-opacity-80")}>
                                Submit
                            </button>
                        </div>
                    </form>
                </TransitionWrapper>
            )}
        </main>
    );
}