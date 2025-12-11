import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Home from "@/pages/Home";

import DefaultLayout from "@/layouts/DefaultLayout";
import AuthLayout from "@/layouts/AuthLayout";

import { HOCDemo } from "@/pages/HOCDemo";
import RenderPropsDemo from "./pages/RenderPropsDemo";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <DefaultLayout>
                            <Home />
                        </DefaultLayout>
                    }
                />

                <Route
                    path="/login"
                    element={
                        <AuthLayout title="Đăng nhập">
                            <Login />
                        </AuthLayout>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <AuthLayout title="Đăng ký tài khoản">
                            <Register />
                        </AuthLayout>
                    }
                />

                <Route path="/hoc" element={<HOCDemo />} />

                <Route path="/render-props" element={<RenderPropsDemo />} />
            </Routes>
        </BrowserRouter>
    );
}
