import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryPrivate } from "../../redux/baseUrl"
import { MetrickResponse, MicrofinanceResponse, MicrofinanceResquest } from "./type"
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
        }),
        createMicrofinance:builder.mutation<{success:boolean}, MicrofinanceResquest>({
            query:(credential)=>({
                url:"/users/tenant",
                method:"POST",
                body:{
                    name:credential.name,
                    email:credential.email,
                    password_hash:credential.password_hash,
                    phone_number:credential.phone_number,
                    profile_picture:credential.profile_picture,
                    apiUrl:credential.apiUrl,
                    address:credential.address,
                    city:credential.city,
                    country:credential.country,
                    documents:[...credential.documents],
                    is_tenant:true
                }
            }),
            invalidatesTags:['microfinances']
        }),
        createTenantLicence:builder.mutation<{success:boolean}, {user_id:number, license_plan_id:number,lang:string,auth_token:string}>({
            query:({user_id, license_plan_id, lang, auth_token})=>({
                url:"/tenant-licenses",
                method:"POST",
                params:{lang},
                body:{
                    user_id,
                    license_plan_id, 
                    lang,
                    auth_token
                }
            }),
            invalidatesTags:['microfinances']
        }),
        getMetrickById:builder.query<MetrickResponse,{user_id:number, month:string}>({
            query:({user_id, month})=>({
                url:`/tenant-metrics/${user_id}`,
                params:{
                    user_id:user_id,
                    month :month 
                }
            })
        })
    })
})

export const {
    useGetAllMicrofinanceQuery,
    useLazyGetAllMicrofinanceQuery,
    useGetMicrofinanceByIdQuery,
    useLazyGetMicrofinanceByIdQuery,
    useCreateMicrofinanceMutation,
    useCreateTenantLicenceMutation,
    useGetMetrickByIdQuery,
    useLazyGetMetrickByIdQuery
} = microfinanceApi