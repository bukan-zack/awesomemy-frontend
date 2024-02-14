"use client";

import useSWR from "swr";
import Link from "next/link";
import { fetchProjects } from "@/app/lib/http/project";
import { TransitionWrapper } from "@/app/components/TransitionWrapper";

export default function Home() {
    const { data: projects, error } = useSWR("/public/projects", () => fetchProjects(1));
    
    return (
        <main className="max-w-6xl mx-auto px-8 flex py-8 flex-col justify-center">
            <TransitionWrapper>
                <h2 className="font-cal-sans text-4xl md:text-5xl text-white tracking-wider mb-4">
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
                                        {project.tags.map((tag) => (
                                            <span className="px-4 py-1 bg-white/5 rounded-md">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </TransitionWrapper>
        </main>
    );
}
