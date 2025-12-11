export default function withLoading(Component) {
    return function WithLoadingComponent({ isLoading, ...props }) {
        if (isLoading) {
            return <div>Loading...</div>;
        }
        return <Component {...props} />;
    };
}
