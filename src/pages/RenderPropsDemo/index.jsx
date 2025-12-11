import DataFetcher from "../../components/DataFetcher";

export default function RenderPropsDemo() {
    return (
        <div style={{ padding: 20 }}>
            <h2>Posts List</h2>
            <DataFetcher url="https://jsonplaceholder.typicode.com/posts?_limit=5">
                {({ data, loading, error }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error: {error}</p>;

                    return (
                        <ul>
                            {data.map((post) => (
                                <li key={post.id}>
                                    {post.id}. {post.title}
                                </li>
                            ))}
                        </ul>
                    );
                }}
            </DataFetcher>

            <h2 style={{ marginTop: 40 }}>Users List</h2>
            <DataFetcher url="https://jsonplaceholder.typicode.com/users?_limit=3">
                {({ data, loading, error }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error: {error}</p>;

                    return (
                        <ul>
                            {data.map((user) => (
                                <li key={user.id}>
                                    {user.id}. {user.name} - email: {user.email}
                                </li>
                            ))}
                        </ul>
                    );
                }}
            </DataFetcher>
        </div>
    );
}
