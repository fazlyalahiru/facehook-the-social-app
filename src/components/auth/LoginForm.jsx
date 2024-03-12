import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuthProvider";


export default function LoginForm() {
    const navigate = useNavigate()
    const { auth, setAuth } = useAuth();
    console.log(auth, "auth");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (formData) => {
        const user = { ...formData }
        setAuth({ user })
        navigate("/")
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                    type="submit"
                >
                    Login
                </button>
            </Field>
        </form>
    );
}