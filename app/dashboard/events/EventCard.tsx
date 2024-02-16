import Link from "next/link";
import { differenceInHours, format, formatDistanceToNow } from "date-fns";
import { truncate } from "@/app/lib/utils/truncate";
import { Event } from "@/app/lib/http/event";

export function EventCard({
    event,
}: {
    event: Event;
}) {
    return (
        <Link href={`/dashboard/events/${event.uuid}`}>
            <div className="transition duration-500 ease-in-out border border-white/15 hover:border-white/20 px-6 py-4 rounded-lg">
                <h3 className="text-white text-xl">
                    {event.name}
                </h3>
                <p>
                    {truncate(event.description, 128)}
                </p>
                <div className="flex flex-row gap-2 mt-4 text-sm">
                    {event.tags.length > 3 ? (
                        <div className="flex flex-row gap-2 items-center">
                            <span className="px-4 py-1 rounded-md border border-white/10">
                                {event.tags[0]}
                            </span>
                            <span>+ {event.tags.length - 1} more</span>
                        </div>
                    ): (
                        event.tags.map((tag, ix) => (
                        <span className="px-4 py-1 border border-white/10 rounded-md" key={ix}>
                            {tag}
                        </span>
                    )))}
                </div>
                <div className="mt-2">
                    <span className="text-sm text-white/40">
                        {Math.abs(differenceInHours(event.createdAt, new Date())) > 48
                            ? format(event.createdAt, 'MMM do, yyyy h:mma')
                            : formatDistanceToNow(event.createdAt, { addSuffix: true })
                        }
                    </span>
                </div>
            </div>
        </Link>
    );
}