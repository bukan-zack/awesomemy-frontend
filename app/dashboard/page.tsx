"use client";

import { TransitionWrapper } from "@/app/components/TransitionWrapper";
import Link from "next/link";
import useSWR from "swr";
import { fetchUserProjects } from "@/app/lib/http/project";
import { ProjectCard } from "@/app/dashboard/projects/ProjectCard";

export default function Dashboard() {
    const { data } = useSWR("/client/projects?page=1&limit=3", () => fetchUserProjects(1, 3));

    return (
        <main className="max-w-6xl mx-auto px-8 flex py-8 flex-col justify-center">
            <TransitionWrapper>
                <h1 className="font-cal-sans mt-16 text-5xl md:text-6xl text-white tracking-wider mb-4">
                    Dashboard
                </h1>
                <h2 className="font-cal-sans mt-16 text-4xl md:text-5xl text-white tracking-wider mb-4">
                    Projects
                </h2>
                {!data ? "Loading..." : data.projects.length === 0 ? "No projects here... yet" : (
                    <div className="grid md:grid-cols-3 gap-4">
                        {data.projects.map((project, ix) => (
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
            </TransitionWrapper>
        </main>
    );
}