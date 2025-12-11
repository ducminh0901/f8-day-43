import withLoading from "@/hoc/withLoading";

function UserProfile({ user }) {
    if (!user) {
        return <div>Please log in to view your profile.</div>;
    }
    return (
        <div>
            <h2>User Profile</h2>
            <p>
                Name: {user.firstName} {user.lastName}
            </p>
            <p>Email: {user.email}</p>
        </div>
    );
}

export default withLoading(UserProfile);
