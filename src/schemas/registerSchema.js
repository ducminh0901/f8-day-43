import { z } from "zod";

export const registerSchema = z
    .object({
        fullName: z.string().min(2, "Tên quá ngắn"),
        email: z.string().email("Email không hợp lệ"),
        password: z.string().min(8, "Tối thiểu 8 ký tự"),
        confirmPassword: z.string().min(8, "Tối thiểu 8 ký tự"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
    });
