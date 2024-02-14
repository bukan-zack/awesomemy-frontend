"use client";

import useSWR from "swr";
import Link from "next/link";
import { fetchProjects } from "@/app/lib/http/project";
import { TransitionWrapper } from "@/app/components/TransitionWrapper";

export default function Home() {
    const { data: projects, error } = useSWR("/public/projects", () => fetchProjects(1));
    
    return (
        <main className="max-w-6xl mx-auto px-8 flex py-24 flex-col justify-center">
            <TransitionWrapper>
                <h1 className="text-center font-cal-sans text-white text-5xl md:text-6xl tracking-wide">
                    AwesomeMY
                </h1>
                <p className="text-center md:text-xl mt-2 tracking-wide">
                    Your all-in-one hub for exploring groundbreaking innovations, disruptive startups, exclusive insights, and dynamic events shaping the Malaysian tech scene.
                </p>
                <h2 className="font-cal-sans mt-16 text-4xl md:text-5xl text-white tracking-wider mb-4">
                    Projects
                </h2>
                {!projects ? "Loading..." : !projects.length ? "No projects here... yet" : (
                    <div className="grid md:grid-cols-3 gap-4">
                        {projects.map((project, ix) => (
                            <Link href={`/projects/${project.uuid}`} key={ix}>
                                <div className="transition duration-500 ease-in-out border border-white/10 hover:border-white/40 px-8 py-4 rounded-lg " key={ix}>
                                    <h3 className="text-white text-lg">
                                        {project.name}
                                    </h3>
                                    <p>
                                        {project.description}
                                    </p>
                                    <div className="flex flex-row gap-2 mt-4 text-sm">
                                        {project.tags.map((tag, ix) => (
                                            <span className="px-4 py-1 bg-white/5 rounded-md" key={ix}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                <Link
                    href="/projects"
                    className="transition duration-500 ease-in-out mt-4 text-white/40 hover:text-white/80 flex flex-row gap-2 items-center"
                >
                    View more projects
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="M9.575 12L5 7.4L6.4 6l6 6l-6 6L5 16.6zm6.6 0L11.6 7.4L13 6l6 6l-6 6l-1.4-1.4z"></path></svg>
                </Link>
            </TransitionWrapper>
        </main>
    );
}
