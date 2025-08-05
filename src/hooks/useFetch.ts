import { useEffect, useState } from "react";

export const useFetch = <T = unknown>(
    url: string,
    options?: RequestInit
): { data: T | null; error: Error | null; loading: boolean } => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetch(url, options)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(
                        `HTTP error ${res.status} ${res.statusText}`
                    );
                }

                return res.json() as Promise<T>;
            })
            .then((res) => setData(res))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, [options, url]);

    return { data, loading, error };
};
