import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryPrivate } from "../../redux/baseUrl";
import { pagination } from "../../interfaces/user.interface";
import { MessageResponse } from "./type";

export const messageApi = createApi({
    baseQuery: baseQueryPrivate,
    reducerPath: "messageApi",
    tagTypes: ['message'],
    endpoints: (builder) => ({
        getAllMessages: builder.query<pagination<MessageResponse>, { page: number, limit: number }>({
            query: ({ page, limit }) => ({
                url: "/contact-us",
                params: { page, limit }
            }),
            providesTags: ['message']
        })
    })
})

export const {
    useGetAllMessagesQuery,
    useLazyGetAllMessagesQuery
} = messageApi