"use client";

import { TransitionWrapper } from "@/app/components/TransitionWrapper";
import Link from "next/link";
import useSWR from "swr";
import { fetchUserProjects } from "@/app/lib/http/project";
import { ProjectCard } from "@/app/dashboard/projects/ProjectCard";
import { Spinner } from "@/app/components/Spinner";
import { fetchUserEvents } from "../lib/http/event";
import { EventCard } from "@/app/dashboard/events/EventCard";

export default function Page() {
    const { data: projectData } = useSWR("/client/projects?page=1&limit=3", () => fetchUserProjects(1, 3));
    const { data: eventData } = useSWR("/client/events?page=1&limit=3", () => fetchUserEvents(1, 3));

    return (
        <main className="max-w-6xl mx-auto px-8 flex py-24 flex-col justify-center">
            <TransitionWrapper>
                <div className="flex flex-col md:flex-row gap-4 md:items-center mb-8 md:mb-4 justify-between">
                    <h2 className="font-cal-sans text-4xl md:text-5xl text-white tracking-wider">
                        Your Projects
                    </h2>
                    <div>
                        <Link href="/dashboard/projects/new" className="bg-white rounded-lg text-black px-4 py-2">
                            New
                        </Link>
                    </div>
                </div>
                {!projectData ? <Spinner centered /> : projectData.projects.length === 0 ? "No projects here... yet" : (
                    <div className="grid md:grid-cols-3 gap-4">
                        {projectData.projects.map((project, ix) => (
                            <ProjectCard project={project} key={ix} />
                        ))}
                    </div>
                )}
                <Link
                    href="/dashboard/projects"
                    className="transition duration-500 ease-in-out mt-4 text-white/50 hover:text-white/70 flex flex-row gap-2 items-center"
                >
                    View more projects
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="M9.575 12L5 7.4L6.4 6l6 6l-6 6L5 16.6zm6.6 0L11.6 7.4L13 6l6 6l-6 6l-1.4-1.4z"></path></svg>
                </Link>
                <div className="flex flex-col md:flex-row gap-4 md:items-center mt-16 mb-8 md:mb-4 justify-between">
                    <h2 className="font-cal-sans text-4xl md:text-5xl text-white tracking-wider">
                        Your Events
                    </h2>
                    <div>
                        <Link href="/dashboard/events/new" className="bg-white rounded-lg text-black px-4 py-2">
                            New
                        </Link>
                    </div>
                </div>
                {!eventData ? <Spinner centered /> : eventData.events.length === 0 ? "No events here... yet" : (
                    <div className="grid md:grid-cols-3 gap-4">
                        {eventData.events.map((event, ix) => (
                            <EventCard event={event} key={ix} />
                        ))}
                    </div>
                )}
                <Link
                    href="/dashboard/events"
                    className="transition duration-500 ease-in-out mt-4 text-white/50 hover:text-white/70 flex flex-row gap-2 items-center"
                >
                    View more events
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="M9.575 12L5 7.4L6.4 6l6 6l-6 6L5 16.6zm6.6 0L11.6 7.4L13 6l6 6l-6 6l-1.4-1.4z"></path></svg>
                </Link>
            </TransitionWrapper>
        </main>
    );
}