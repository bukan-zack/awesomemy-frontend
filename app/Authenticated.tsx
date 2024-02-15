"use client";

import React, { useEffect, useState } from "react";
import { useUserStore } from "@/app/lib/stores/user";
import { fetchAuthenticatedUser } from "@/app/lib/http/user";
import { Spinner } from "@/app/components/Spinner";

export function Authenticated({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, setUser } = useUserStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            fetchAuthenticatedUser()
                .then((user) => setUser(user))
                .catch((error) => console.log(error))
                .finally(() => setLoading(false));
        }
    }, []);

    return loading ? <Spinner className="min-h-screen" centered /> : children;
}