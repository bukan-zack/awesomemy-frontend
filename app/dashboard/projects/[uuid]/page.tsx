"use client";

import { Spinner } from "@/app/components/Spinner";
import { TransitionWrapper } from "@/app/components/TransitionWrapper";
import { Project, deleteProject, fetchProject, updateProject } from "@/app/lib/http/project";
import clsx from "clsx";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface ProjectInput {
    name: string;
    description: string;
    tags: string[];
    repository: string;
    website: string;
}

export const runtime = "edge";

export default function Page() {
    const router = useRouter();
    const { uuid } = useParams<{
        uuid: string;
    }>();
    const { handleSubmit, register } = useForm<ProjectInput>();
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState<Project>({} as Project);
    const [submitting, setSubmitting] = useState(false);

    function handleDeletion() {
        deleteProject(project.uuid)
            .then(() => router.push("/dashboard/projects"));
    }

    function onSubmit(data: ProjectInput) {
        setSubmitting(true);

        updateProject({
            uuid: project.uuid,
            name: data.name,
            description: data.description,
            tags: project.tags,
            repository: data.repository,
            website: data.website,
        })
            .finally(() => setSubmitting(false));
    }

    useEffect(() => {
        fetchProject(uuid)
            .then((project) => setProject(project))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);
    
    return (
        <main className="max-w-6xl mx-auto px-8 flex py-24 flex-col justify-center">
            {loading ? <Spinner centered /> : (
                <TransitionWrapper>
                    <Link href="/dashboard/projects" className="mb-6 transition duration-500 ease-in-out text-white/50 hover:text-white/70 flex flex-row gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18">
                            </path>
                        </svg>
                        Projects
                    </Link>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <span>
                                Name
                            </span>
                            <input
                                className="rounded-lg px-4 py-2 transition duration-500 ease-in-out bg-transparent border outline-none border-white/20 hover:border-white/50 focus:border-white/50"
                                placeholder="Name"
                                defaultValue={project.name}
                                {...register("name")}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <span>
                                Description
                            </span>
                            <textarea
                                className="rounded-lg px-4 py-2 transition duration-500 ease-in-out bg-transparent border outline-none border-white/20 hover:border-white/50 focus:border-white/50"
                                placeholder="Description"
                                defaultValue={project.description}
                                {...register("description")}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <span>
                                Repository
                            </span>
                            <input
                                className="rounded-lg px-4 py-2 transition duration-500 ease-in-out bg-transparent border outline-none border-white/20 hover:border-white/50 focus:border-white/50"
                                placeholder="Repository"
                                defaultValue={project.repository ?? ""}
                                {...register("repository")}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <span>
                                Website
                            </span>
                            <input
                                className="rounded-lg px-4 py-2 transition duration-500 ease-in-out bg-transparent border outline-none border-white/20 hover:border-white/50 focus:border-white/50"
                                placeholder="Website"
                                defaultValue={project.website ?? ""}
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