import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuthProvider";
import Header from "../components/common/Header";
import ProfileProvider from "../providers/ProfileProvider";

export default function PrivateRoute() {
    const { auth } = useAuth()
    return (
        <div>
            {
                auth?.authToken ?
                    <ProfileProvider>
                        <Header />
                        <Outlet />
                    </ProfileProvider>
                    :
                    <Navigate to="/login" />
            }
        </div>
    );
}