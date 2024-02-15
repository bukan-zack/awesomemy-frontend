import clsx from "clsx";
import { useEffect } from "react";

export function Spinner({
    className,
    centered,
}: {
    className?: string;
    centered?: boolean;
}) {
    useEffect(() => {
        async function getLoader() {
            const { ring2 } = await import("ldrs");

            ring2.register();
        }

        getLoader();
    }, []);

    return <div className={clsx(className, centered && "flex flex-col justify-center items-center w-full")}>
        <l-ring-2
            size="40"
            stroke="5"
            stroke-length="0.25"
            bg-opacity="0.1"
            speed="0.8" 
            color="white" 
        />
    </div>;
}