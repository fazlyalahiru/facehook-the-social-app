import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuthProvider";

export default function PrivateRoute() {
    const { auth } = useAuth()
    return (
        <div>
            {
                auth?.user ? <Outlet /> : <Navigate to="/login" />
            }
        </div>
    );
}