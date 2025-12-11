import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas/registerSchema";
import { useRegisterMutation } from "@/services/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [registerUser, { isLoading }] = useRegisterMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (values) => {
        const nameParts = values.fullName.trim().split(" ");
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(" ") || "-";

        const body = {
            firstName,
            lastName,
            email: values.email,
            password: values.password,
            password_confirmation: values.confirmPassword,
        };

        try {
            const res = await registerUser(body).unwrap();
            navigate("/");
        } catch (err) {
            alert(err?.data?.message || "Đăng ký thất bại!");
        }
    };

    return (
        <form
            onSubmit={handleSubmit((v) => {
                onSubmit(v);
            })}
        >
            <div>
                <label>Họ tên</label>
                <input placeholder="Nguyễn Văn A" {...register("fullName")} />
                <p className="error">{errors.fullName?.message}</p>
            </div>

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

            <div>
                <label>Xác nhận mật khẩu</label>
                <input type="password" {...register("confirmPassword")} />
                <p className="error">{errors.confirmPassword?.message}</p>
            </div>

            <button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Đăng ký"}
            </button>

            <p>
                Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
            </p>
        </form>
    );
}
