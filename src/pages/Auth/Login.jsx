import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/loginSchema";
import { useLoginMutation } from "@/services/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (values) => {
        try {
            const res = await login(values).unwrap();

            localStorage.setItem("accessToken", res.data.access_token);
            localStorage.setItem("refreshToken", res.data.refresh_token);

            navigate("/");
        } catch (err) {
            alert(err?.data?.message || "Đăng nhập thất bại!");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Email</label>
                <input placeholder="example@gmail.com" {...register("email")} />
                <p className="error">{errors.email?.message}</p>
            </div>

            <div>
                <label>Mật khẩu</label>
                <input type="password" {...register("password")} />
                <p className="error">{errors.password?.message}</p>
            </div>

            <button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Đăng nhập"}
            </button>

            <p>
                Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
            </p>
        </form>
    );
}
