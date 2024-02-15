"use client";

import useSWR from "swr";
import { fetchProjects } from "@/app/lib/http/project";
import { TransitionWrapper } from "@/app/components/TransitionWrapper";
import { ProjectCard } from "@/app/projects/ProjectCard";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function Home() {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const [page, setPage] = useState(1);
    const { data } = useSWR(`/public/projects?page=${page}`, () => fetchProjects(page));
    
    useEffect(() => {
        setPage(parseInt(searchParams.get("page") ?? "1"));
    }, [searchParams, pathName]);

    return (
        <main className="max-w-6xl mx-auto px-8 flex py-8 flex-col justify-center">
            <TransitionWrapper key={page}>
                <h2 className="font-cal-sans text-4xl md:text-5xl text-white tracking-wider mb-4">
                    Projects
                </h2>
                {!data ? "Loading..." : data.projects.length === 0 ? "No projects here... yet" : (
                    <>
                        <div className="grid md:grid-cols-3 gap-4">
                            {data.projects.map((project, ix) => (
                                <ProjectCard project={project} key={ix} />
                            ))}
                        </div>
                        <div className="mt-4 flex flex-row justify-between items-center">
                            <p>
                                {data.pagination.currentPage} out of {data.pagination.totalPages}
                            </p>
                            <div className="flex flex-row gap-4">
                                <button onClick={() => setPage(page - 1)}>
                                    Previous
                                </button>
                                <button onClick={() => setPage(page + 1)}>
                                    Next
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </TransitionWrapper>
        </main>
    );
}
