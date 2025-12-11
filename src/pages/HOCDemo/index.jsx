import { useMeQuery } from "@/services/auth";
import { useState } from "react";
import UserProfile from "./components/UserProfile";
import ProductList from "./components/ProductList";

export function HOCDemo() {
    const [userLoading, setUserLoading] = useState(false);
    const [productLoading, setProductLoading] = useState(false);

    const { data: userData } = useMeQuery();

    return (
        <div>
            <button onClick={() => setUserLoading((prev) => !prev)}>
                Toggle UserLoading
            </button>
            <button onClick={() => setProductLoading((prev) => !prev)}>
                Toggle ProductLoading
            </button>

            <hr />

            <UserProfile isLoading={userLoading} user={userData?.data} />
            <ProductList isLoading={productLoading} />
        </div>
    );
}
