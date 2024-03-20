import React from "react";
import { useAuth } from "../hooks/useAuthProvider";
import { useAxios } from "../hooks/useAxios";
import { useProfile } from "../hooks/useProfileProvider";
import { actions } from "../actions";

export default function Profile() {
    const { state, dispatch } = useProfile()
    console.log(state, "state",);
    // const [user, setUser] = React.useState(null);
    // const [posts, setPosts] = React.useState([]);
    const [, setLoading] = React.useState(false)
    const { api } = useAxios();
    const { auth } = useAuth();

    React.useEffect(() => {

        const fetchProfile = async () => {
            dispatch({ type: actions.profile.DATA_FETCHING })
            try {
                const res = await api.get(`/profile/${auth?.user?.id}`);
                console.log(res.data, "res.data");
                if (res.status === 200) {
                    dispatch({ type: actions.profile.DATA_FETCHED, data: res.data })
                }
                // setUser(user)
            } catch (error) {
                console.log(error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, [])

    if (state?.loading) <div>Fetching...</div>
    return (
        <>
            <p>{state?.user?.lastName}</p>
            <p>{state?.posts.length}</p>
        </>
    );
}