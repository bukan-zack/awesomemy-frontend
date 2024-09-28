"use client";

import useSWR from "swr";
import Link from "next/link";
import { fetchProjects } from "@/app/lib/http/project";
import { TransitionWrapper } from "@/app/components/TransitionWrapper";
import { ProjectCard } from "@/app/projects/ProjectCard";
import { Spinner } from "@/app/components/Spinner";
import { fetchEvents } from "@/app/lib/http/event";
import { EventCard } from "@/app/events/EventCard";

export default function Page() {
    const { data: projectData } = useSWR("/public/projects?page=1&limit=3", () => fetchProjects(1, 3, "desc"));
    const { data: eventData } = useSWR("/public/events?page=1&limit=3", () => fetchEvents(1, 3, "desc"));

    return (
        <main className="max-w-6xl mx-auto px-12 flex py-24 flex-col justify-center">
            <TransitionWrapper>
                <h1 className="uppercase text-white text-5xl md:text-7xl tracking-wide">
                    Directory
                </h1>
                <p className="md:text-xl mt-6 tracking-wide">
                    This page is currently under development. 🚧
                </p>
                <h2 className="mb-10 w-fit uppercase mt-24 text-4xl md:text-5xl text-white tracking-wider">
                    Latest Projects
                    <div className="bg-main-orange h-1 w-3/4 mt-1.5" />
                </h2>
                {!projectData ? <Spinner centered /> : projectData.projects.length === 0 ? "No projects here... yet" : (
                    <div className="grid md:grid-cols-3 gap-4">
                        {projectData.projects.map((project, ix) => (
                            <ProjectCard project={project} key={ix} />
                        ))}
                    </div>
                )}
                <Link
                    href="/projects"
                    className="transition duration-500 ease-in-out mt-4 text-white/50 hover:text-white/70 flex flex-row gap-2 items-center"
                >
                    View more projects
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="M9.575 12L5 7.4L6.4 6l6 6l-6 6L5 16.6zm6.6 0L11.6 7.4L13 6l6 6l-6 6l-1.4-1.4z"></path></svg>
                </Link>
                <h2 className="mb-10 w-fit uppercase mt-24 text-4xl md:text-5xl text-white tracking-wider">
                    Latest Events
                    <div className="bg-main-orange h-1 w-3/4 mt-1.5" />
                </h2>
                {!eventData ? <Spinner centered /> : eventData.events.length === 0 ? "No events here... yet" : (
                    <div className="grid md:grid-cols-3 gap-4">
                        {eventData.events.map((event, ix) => (
                            <EventCard event={event} key={ix} />
                        ))}
                    </div>
                )}
                <Link
                    href="/events"
                    className="transition duration-500 ease-in-out mt-4 text-white/50 hover:text-white/70 flex flex-row gap-2 items-center"
                >
                    View more events
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="M9.575 12L5 7.4L6.4 6l6 6l-6 6L5 16.6zm6.6 0L11.6 7.4L13 6l6 6l-6 6l-1.4-1.4z"></path></svg>
                </Link>
            </TransitionWrapper>
        </main>
    );
}
