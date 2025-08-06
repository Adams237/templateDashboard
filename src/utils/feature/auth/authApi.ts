import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryPrivate } from "../../redux/baseUrl";
import { AuthResponse, LoginRequest } from "./type";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryPrivate,
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, {user:LoginRequest, lang:string}>({
            query: ({user,lang}) => ({
                url: '/auth/login',
                method: 'POST',
                body:{
                    email:user.email,
                    password_hash:user.password_hash,
                    lang
                },
            }),
        }),
        verifyOtp: builder.mutation<AuthResponse, {email:string, otp:string, lang:string}>({
            query: ({email,otp,lang}) => ({
                url: '/auth/login/verify-otp',
                method: 'POST',
                body:{
                    email,
                    otp,
                    lang
                },
            }),
        }),
    }),
})
export const {
    useLoginMutation,
    useVerifyOtpMutation
} = authApi;