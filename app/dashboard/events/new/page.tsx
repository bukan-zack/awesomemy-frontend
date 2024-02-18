"use client";

import { TransitionWrapper } from "@/app/components/TransitionWrapper";
import { humanizeError } from "@/app/lib/http/error";
import { storeEvent } from "@/app/lib/http/event";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

export default function Page() {
    const router = useRouter();
    const { handleSubmit, register } = useForm<EventInput>();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [inputTag, setInputTag] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);

    function onSubmit(data: EventInput) {
        setSubmitting(true);

        storeEvent({
            name: data.name,
            description: data.description,
            tags: tags,
            website: data.website,
            startsAt: new Date(),
            endsAt: new Date(),
        })
            .then((event) => {
                toast.info("You have successfully created an event.");
                router.push(`/dashboard/events/${event.uuid}`);
            })
            .catch((error) => toast.error(humanizeError(error)))
            .finally(() => setSubmitting(false));
    }
    
    return (
        <main className="max-w-6xl mx-auto px-8 flex py-10 flex-col justify-center">
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
                            {...register("description")}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="tags">
                            Tags
                        </label>
                        {tags.length > 0 && <div className="flex flex-row gap-2 overflow-hidden">
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
                        </div>}
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
                            {...register("website")}
                        />
                    </div>
                    <div className="self-end">
                        <button disabled={submitting} type="submit" className={clsx("bg-white rounded-lg text-black px-4 py-2", submitting && "bg-opacity-80")}>
                            Submit
                        </button>
                    </div>
                </form>
            </TransitionWrapper>
        </main>
    );
}