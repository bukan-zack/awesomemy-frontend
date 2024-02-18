import { PaginationMeta } from "@/app/lib/http/pagination";

export function Pagination<T>({
    items,
    meta,
    children,
    changePage,
}: {
    items: T[];
    meta: PaginationMeta;
    children: ({ items }: {
        items: T[];
    }) => React.ReactNode;
    changePage: (page: number) => void;
}) {
    return (
        <>
            {children({ items: items })}
            <div className="mt-4 flex flex-col md:flex-row justify-between items-center">
                <p className="text-white/50">
                    You are viewing {meta.currentPage} out of {meta.totalPages} pages.
                </p>
                <div className="flex flex-row gap-6 mt-4 md:mt-0">
                    {meta.currentPage > 1 &&
                        <button
                            className="transition duration-500 ease-in-out text-white/50 hover:text-white/70 flex flex-row gap-2 items-center"
                            onClick={() => changePage(meta.currentPage - 1)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18">
                                </path>
                            </svg>
                            Previous
                        </button>
                    }
                    {meta.currentPage < meta.totalPages &&
                        <button
                            className="transition duration-500 ease-in-out text-white/50 hover:text-white/70 flex flex-row gap-2 items-center"
                            onClick={() => changePage(meta.currentPage + 1)}
                        >
                            Next
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 20 20">
                                <path fill="currentColor" fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10" clipRule="evenodd">
                                </path>
                            </svg>
                        </button>
                    }
                </div>
            </div>
        </>
    );
}