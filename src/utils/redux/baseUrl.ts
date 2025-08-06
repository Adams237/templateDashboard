import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface RootState {
    user: {
        token: string;
    };
}


export const baseQueryPrivate = fetchBaseQuery({
    baseUrl: "https://ecollectsuperadminapi.onrender.com/",
    // baseUrl: "https://ecollectapi.onrender.com",
    // credentials: 'include',
    prepareHeaders: (headers, { getState }) => {

        const token = (getState() as RootState).user.token
        console.log(token)
        if (token) {
            headers.set('Authorization', `Bearer ${(token)}`)
        }
        return headers
    }
})