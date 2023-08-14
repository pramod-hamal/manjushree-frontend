import { useEffect, useState } from "react";

export const useSession = () => {
    const [session, setSession] = useState<string | null>(null);

    const getSession = async () => {
        const data = localStorage.getItem("token");
        if (data) {
            setSession(data);
        }
    };

    useEffect(() => {
        getSession();
    }, []);

    return session;
};