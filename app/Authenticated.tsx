"use client";

import React, { useEffect } from "react";
import { useUserStore } from "@/app/lib/stores/user";
import { fetchAuthenticatedUser } from "@/app/lib/http/user";

export function Authenticated({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, setUser } = useUserStore();

    useEffect(() => {
        if (!user) {
            fetchAuthenticatedUser()
                .then((user) => setUser(user))
                .catch((error) => console.log(error));
        }
    }, []);

    return children;
}