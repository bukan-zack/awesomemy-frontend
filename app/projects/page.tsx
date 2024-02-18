"use client";

import useSWR from "swr";
import Link from "next/link";
import { fetchProjects } from "@/app/lib/http/project";
import { TransitionWrapper } from "@/app/components/TransitionWrapper";
import { ProjectCard } from "@/app/projects/ProjectCard";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@/app/components/Spinner";
import { Pagination } from "@/app/components/Pagination";
import { Select } from "@/app/components/Select";

export default function Page() {
    const [page, setPage] = useState<number>(1);
    const [orderBy, setOrderBy] = useState<string>("desc");

    const { replace } = useRouter();
    const { data, mutate } = useSWR(
        `/public/projects?page=${page}&limit=12&orderBy=${orderBy}`, 
        () => fetchProjects(page, 12, orderBy),
    );
    
    const searchParams = useSearchParams();
    const pathName = usePathname();

    function changeOrder(orderBy: string) {
        replace(`${pathName}?page=${page}&orderBy=${orderBy}`);
    }

    function changePage(page: number) {
        replace(`${pathName}?page=${page}&orderBy=${orderBy}`);
    }

    useEffect(() => {
        setPage(parseInt(searchParams.get("page") ?? "1"));
        setOrderBy(searchParams.get("orderBy") ?? "desc");
        mutate();
    }, [searchParams, pathName]);

    return (
        <main className="max-w-6xl mx-auto px-8 flex py-10 flex-col justify-center">
            <TransitionWrapper key={page}>
                <Link href="/" className="mb-6 transition duration-500 ease-in-out text-white/50 hover:text-white/70 flex flex-row gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18">
                        </path>
                    </svg>
                    Home
                </Link>
                <h2 className="font-cal-sans text-4xl md:text-5xl text-white tracking-wider">
                    Projects
                </h2>
                <p className="md:text-lg mt-1 tracking-wide mb-4">
                    Embark on an exhilarating odyssey through a captivating array of projects that are revolutionising the very fabric of the Malaysian tech landscape!
                </p>
                <div className="my-4">
                    <Select.Root onValueChange={changeOrder} value={orderBy}>
                        <Select.Trigger className="w-[140px]">
                            <Select.Value>
                                {orderBy === "desc" ? "Descending" : "Ascending"}
                            </Select.Value>
                        </Select.Trigger>
                        <Select.Content>
                            <Select.Item value="desc">
                                Descending
                            </Select.Item>
                            <Select.Item value="asc">
                                Ascending
                            </Select.Item>
                        </Select.Content>
                    </Select.Root>
                </div>
                {!data
                    ? <Spinner centered /> 
                    : data.projects.length === 0 
                        ? "No projects here... yet." 
                        : (
                            <Pagination
                                items={data.projects}
                                meta={data.paginationMeta}
                                changePage={changePage}
                            >
                                {({ items }) => (
                                    <div className="grid md:grid-cols-3 gap-4">
                                        {items.map((project, ix) => (
                                            <ProjectCard project={project} key={ix} />
                                        ))}
                                    </div>
                                )}
                            </Pagination>
                        )
                }
            </TransitionWrapper>
        </main>
    );
}
