import { useEffect } from "react";
import { useAuth } from "./useAuthProvider"
import { api } from "../api/api";

export const useAxios = () => {
    const { auth, setAuth } = useAuth();
    useEffect(() => {
        const requestIntercept = api.interceptors.request.use((config) => {
            const authToken = auth.authToken;
            if (authToken) {
                config.headers.Authorization = `Bearer ${authToken}`
            }

            return config
        },
            (error) => {
                return Promise.reject(error)
            }
        )

        const responseIntercept = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    const refreshToken = auth?.refreshToken;
                    const response = await api.post("/auth/refresh-token", { refreshToken });
                    const { token } = response.data;
                    console.log("new token", token);
                    setAuth({ ...auth, authToken: token })
                    originalRequest.headers.Authorization = `Bearer ${token}`
                    return api(originalRequest)
                }
                return Promise.reject(error)
            }
        )

        return () => {
            api.interceptors.request.eject(requestIntercept),
                api.interceptors.response.eject(responseIntercept)
        }
    }, [auth.authToken])
    return { api }
}