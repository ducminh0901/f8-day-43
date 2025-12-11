import { useMeQuery } from "@/services/auth";
import { Link } from "react-router-dom";

export default function Header() {
    const { data, isLoading } = useMeQuery();

    const user = data?.data;

    return (
        <header className="header">
            {isLoading ? (
                <>Loading...</>
            ) : user ? (
                <>Hi, {user.firstName}</>
            ) : (
                <>
                    <Link to="/login">Sign In</Link> |{" "}
                    <Link to="/register">Sign Up</Link>
                    <Link to="/hoc">HOC Demo</Link>
                    <Link to="/render-props">Render Props Demo</Link>
                </>
            )}
        </header>
    );
}
