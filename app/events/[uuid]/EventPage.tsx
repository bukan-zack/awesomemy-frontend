"use client";

import { Spinner } from "@/app/components/Spinner";
import { TransitionWrapper } from "@/app/components/TransitionWrapper";
import { Event, fetchEvent } from "@/app/lib/http/event";
import Link from "next/link";
import { useEffect, useState } from "react";

export function EventPage({
    uuid,
}: {
    uuid: string;
}) {
    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState<Event>({} as Event);

    useEffect(() => {
        fetchEvent(uuid)
            .then((event) => setEvent(event))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);
    
    return (
        <main className="max-w-6xl mx-auto px-8 flex py-10 flex-col justify-center">
            {loading ? <Spinner centered /> : (
                <TransitionWrapper>
                    <Link href="/events" className="mb-6 transition duration-500 ease-in-out text-white/50 hover:text-white/70 flex flex-row gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18">
                            </path>
                        </svg>
                        Events
                    </Link>
                    <h2 className="font-cal-sans text-4xl md:text-5xl text-white tracking-wider">
                        {event.name}
                    </h2>
                    <div className="flex flex-col mt-4 md:text-lg tracking-wide gap-1">
                        {event.description.split("\n").map((text, ix) => (
                            <p key={ix}>
                                {text}
                            </p>
                        ))}
                    </div>
                    {event.website && (
                        <div className="mt-6">
                            <h3 className="font-cal-sans text-3xl md:text-4xl text-white tracking-wider">
                                Links
                            </h3>
                            <div className="flex flex-col gap-2 mt-2 md:text-lg">
                                {event.website && <Link href={event.website} className="transition duration-500 ease-in-out text-white/50 hover:text-white/70 flex flex-row gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418">
                                    </path>
                                </svg>
                                    {event.website}
                                </Link>}
                            </div>
                        </div>
                    )}
                </TransitionWrapper>
            )}
        </main>
    );
}