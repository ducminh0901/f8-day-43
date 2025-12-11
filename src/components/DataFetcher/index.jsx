import { use, useEffect, useState } from "react";

export default function DataFetcher({ url, children }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignored = false;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error(`Error: ${res.status} ${res.statusText}`);
                }
                const data = await res.json();
                if (!ignored) {
                    setData(data);
                }
            } catch (err) {
                if (!ignored) {
                    setError(err);
                    setData(null);
                }
            } finally {
                if (!ignored) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            ignored = true;
        };
    }, [url]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return children({ loading, error, data });
}
