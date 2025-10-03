import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryPrivate } from "../../redux/baseUrl"
import { MetrickResponse, MicrofinanceResponse, MicrofinanceResquest } from "./type"
import { pagination } from "../../interfaces/user.interface"
import { DocumenetRequest, DocumenetResponse } from "../document/type"

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
        createTenantLicence:builder.mutation<{success:boolean}, {months:number,user_id:number, license_plan_id:number,lang:string,auth_token:string}>({
            query:({user_id, license_plan_id, lang, auth_token,months})=>({
                url:"/tenant-licenses",
                method:"POST",
                params:{lang},
                body:{
                    user_id,
                    license_plan_id, 
                    lang,
                    auth_token,
                    months
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
        }),
        updateMicorfinance: builder.mutation<{ success: boolean }, MicrofinanceResponse>({
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
                    apiUrl:user.apiUrl,
                    // documents: [...user.Documents]
                }
            }),
            invalidatesTags: ['microfinances']
        }),
        updateDocument:builder.mutation<{success:boolean}, {document:DocumenetResponse, lang:string}>({
            query:({document, lang})=>({
                url:`/documents/${document.document_id}`,
                method:"PUT",
                body:{
                    document_type:document.document_type,
                    document_number:document.document_number,
                    file_url:document.file_url,
                    lang
                }
            }),
            invalidatesTags:['microfinances']
        }),
        createDocument:builder.mutation<{success:boolean},{user_id:number, document:DocumenetRequest, lang:string}>({
            query:({user_id, document, lang})=>({
                url:"/documents",
                method:"POST",
                body:{
                    user_id,
                    document,
                    lang
                }
            }),
            invalidatesTags:['microfinances']
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
    useLazyGetMetrickByIdQuery,
    useUpdateMicorfinanceMutation,
    useUpdateDocumentMutation,
    useCreateDocumentMutation
} = microfinanceApi