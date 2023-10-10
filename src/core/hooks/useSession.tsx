import { useEffect, useState } from "react";

import { getCookie } from 'cookies-next';

export const useSession = () => {
    const [session, setSession] = useState<string | null>(null);

    const getSession = async () => {
        const data = getCookie("token")
        if (data) {
            setSession(data);
        }
    };

    useEffect(() => {
        getSession();
    }, []);

    return session;
};
