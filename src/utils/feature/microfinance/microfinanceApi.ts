import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryPrivate } from "../../redux/baseUrl"
import { MicrofinanceResponse } from "./type"
import { pagination } from "../../interfaces/user.interface"

export const microfinanceApi = createApi({
    reducerPath:"microfinanceApi",
    baseQuery:baseQueryPrivate,
    tagTypes:['microfinances'],
    endpoints:(builder)=>({
        getAllMicrofinance:builder.query<pagination<MicrofinanceResponse>,{page:number, limit:number, filter?:"ACTIVE" |"INACTIVE",is_tenant?:boolean}>({
            query:({page,limit,filter,is_tenant})=>({
                url:"/users",
                params:{
                    page, limit, filter, is_tenant
                }
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ user_id }) => ({ type: "microfinances" as const, user_id })),
                        { type: "microfinances", user_id: "LIST" }
                    ]
                    : [{ type: "microfinances", user_id: "LIST" }]
        }),
        getMicrofinanceById:builder.query<MicrofinanceResponse,string>({
            query:(id)=>`/users/${id}`,
            providesTags:['microfinances']
        })
    })
})

export const {
    useGetAllMicrofinanceQuery,
    useLazyGetAllMicrofinanceQuery,
    useGetMicrofinanceByIdQuery,
    useLazyGetMicrofinanceByIdQuery
} = microfinanceApi