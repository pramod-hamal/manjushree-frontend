"use client"

import React, { useEffect } from "react";
import { useSession } from "@/hooks/useSessionleanq_support_coordinator";
import { useRouter } from "next/navigation";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const session = useSession();

    useEffect(() => {
        if (session) {
            router.replace("/dashboard")
        }
    }, [session]);
    return <>{children}</>;
}
