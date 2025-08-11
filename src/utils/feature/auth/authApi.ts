import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryPrivate } from "../../redux/baseUrl";
import { AuthResponse, LoginRequest } from "./type";
import { MicrofinanceResponse } from "../microfinance/type";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryPrivate,
    tagTypes: ['auth'],
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, { user: LoginRequest, lang: string }>({
            query: ({ user, lang }) => ({
                url: '/auth/login',
                method: 'POST',
                body: {
                    email: user.email,
                    password_hash: user.password_hash,
                    lang
                },
            }),
        }),
        verifyOtp: builder.mutation<AuthResponse, { email: string, otp: string, lang: string }>({
            query: ({ email, otp, lang }) => ({
                url: '/auth/login/verify-otp',
                method: 'POST',
                body: {
                    email,
                    otp,
                    lang
                },
            }),
        }),
        getOneUSer: builder.query<MicrofinanceResponse, string>({
            query: (id) => `/users/${id}`,
            providesTags: ['auth']
        }),
        updatePassword: builder.mutation<{ success: boolean }, { old_password: string, new_password: string, lang: "fr" | "en" }>({
            query: ({ old_password, new_password, lang }) => ({
                url: "/auth/change-password",
                method: "POST",
                body: { old_password, new_password, lang }
            })
        }),
        updateInfor: builder.mutation<{ success: boolean }, MicrofinanceResponse>({
            query: (user) => ({
                url: `/users/${user.user_id}`,
                method: "PUT",
                body: {
                    name: user.name,
                    email: user.email,
                    password_hash: user.password_hash,
                    phone_number: user.phone_number,
                    profile_picture: user.profile_picture,
                    address: user.address,
                    city: user.city,
                    country: user.country,
                    apiUrl:"https://ecollectsuperadminapi-1.onrender.com/",
                    // documents: [...user.Documents]
                }
            }),
            invalidatesTags: ['auth']
        })
    }),
})
export const {
    useLoginMutation,
    useVerifyOtpMutation,
    useGetOneUSerQuery,
    useLazyGetOneUSerQuery,
    useUpdatePasswordMutation,
    useUpdateInforMutation
} = authApi;