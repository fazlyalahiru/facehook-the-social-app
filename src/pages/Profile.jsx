import React from "react";
import { useAuth } from "../hooks/useAuthProvider";
import { useAxios } from "../hooks/useAxios";

export default function Profile() {
    const [user, setUser] = React.useState(null);
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(false)
    const { api } = useAxios();
    const { auth } = useAuth();

    React.useEffect(() => {

        const fetchProfile = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/profile/${auth?.user?.id}`);
                console.log(res);
                const user = res.data.user;
                setUser(user)
            } catch (error) {
                console.log(error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, [])

    if (loading) <div>Fetching...</div>
    return (
        <p>{user?.lastName}</p>
    );
}