import { Axios } from "axios";

export const api = Axios.create({
    baseURL: `${import.meta.env.SERVER_BASE_URL}`
})