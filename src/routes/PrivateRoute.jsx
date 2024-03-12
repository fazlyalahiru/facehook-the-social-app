import { useAuth } from "../hooks/useAuthProvider";
import { Navigate, Outlet } from "react-router-dom"

export default function PrivateRoute() {
    const { auth } = useAuth()
    return (
        <div>
            {
                auth.user ? <Outlet /> : <Navigate to="/login" />
            }
        </div>
    );
}