import { Project } from "@/app/lib/http/project";
import Link from "next/link";

export function ProjectCard({
    project,
}: {
    project: Project;
}) {
    return (
        <Link href={`/projects/${project.uuid}`}>
            <div className="transition duration-500 ease-in-out border border-white/10 hover:border-white/40 px-8 py-4 rounded-lg">
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
    );
}