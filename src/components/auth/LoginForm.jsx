import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { useAuth } from "../../hooks/useAuthProvider";
import Field from "../common/Field";


export default function LoginForm() {
    const navigate = useNavigate()
    const { auth, setAuth } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm()

    const onSubmit = async (formData) => {
        const user = { ...formData }
        try {
            const res = await api.post("/auth/login", user);
            const data = res.data;
            if (res.status === 200 && data.token) {
                const user = data.user;
                const token = data.token.token;
                console.log(token, "new token after login");
                const refreshToken = data.token.refreshToken;

                setAuth({ user, token, refreshToken })
                navigate("/")

            }
        } catch (err) {
            setError("random", {
                type: "random",
                message: "No user exist with this email"
            })
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-red-600">{errors?.random && errors?.random?.message}</p>
            <Field htmlFor={"email"} label={"Email"} error={errors.email}>
                <input
                    {...register("email", { required: "Email is required field" })}
                    className={`auth-input ${errors.email ? "border-gray-500" : "border-red-500"}`}
                    type="email"
                    id="email"
                    name="email"
                />
            </Field>
            <Field htmlFor={"password"} label={"Password"} error={errors.password}>
                <input
                    {...register("password", {
                        required: "Password is required", minLength: {
                            value: 6,
                            message: "Password must be minimum 6 digit"
                        }
                    })}
                    className={`auth-input ${errors.password ? "border-gray-500" : "border-red-500"}`}
                    type="password"
                    id="password"
                    name="password"
                />
            </Field>
            <Field>
                <button
                    className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90 my-4"
                    type="submit"
                >
                    Login
                </button>
            </Field>
        </form>
    );
}