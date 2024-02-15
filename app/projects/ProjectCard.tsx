import { Project } from "@/app/lib/http/project";
import Link from "next/link";
import { differenceInHours, format, formatDistanceToNow } from "date-fns";
import { truncate } from "@/app/lib/utils/truncate";

export function ProjectCard({
    project,
}: {
    project: Project;
}) {
    return (
        <Link href={`/projects/${project.uuid}`}>
            <div className="transition duration-500 ease-in-out border border-white/15 hover:border-white/20 px-6 py-4 rounded-lg">
                <h3 className="text-white text-xl">
                    {project.name}
                </h3>
                <p>
                    {truncate(project.description, 64)}
                </p>
                <div className="flex flex-row gap-2 mt-4 text-sm">
                    {project.tags.length > 3 ? (
                        <div className="flex flex-row gap-2 items-center">
                            <span className="px-4 py-1 rounded-md border border-white/10">
                                {project.tags[0]}
                            </span>
                            <span>+ {project.tags.length - 1} more</span>
                        </div>
                    ): (
                        project.tags.map((tag, ix) => (
                        <span className="px-4 py-1 border border-white/10 rounded-md" key={ix}>
                            {tag}
                        </span>
                    )))}
                </div>
                <div className="mt-2">
                    <span className="text-sm text-white/40">
                        {Math.abs(differenceInHours(project.createdAt, new Date())) > 48
                            ? format(project.createdAt, 'MMM do, yyyy h:mma')
                            : formatDistanceToNow(project.createdAt, { addSuffix: true })
                        }
                    </span>
                </div>
            </div>
        </Link>
    );
}