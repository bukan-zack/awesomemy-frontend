"use client";

import { useParams } from "next/navigation";

export default function Project() {
    const { uuid } = useParams<{
        uuid: string;
    }>();
    
    return (
        <main>
            {uuid}   
        </main>
    );
}