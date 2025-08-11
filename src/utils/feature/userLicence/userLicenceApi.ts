import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryPrivate } from "../../redux/baseUrl";
import { pagination } from "../../interfaces/user.interface";
import { UserLicenceResponse } from "./type";

export const userLicenceApi = createApi({
    reducerPath: "userLicenceApi",
    baseQuery: baseQueryPrivate,
    tagTypes: ['userLicences'],
    endpoints: (builder) => ({
        getAllUserLicences: builder.query<pagination<UserLicenceResponse>, {
            page: number,
            limit: number,
            user_id?: number,
            license_status?: 'ACTIVE' | 'EXPIRED' | 'SUSPENDED' | "PENDING",
            expires_from?: string,
            expires_to?: string,
            lang: "en" | "fr"
        }>({
            query: (
                {
                    page,
                    limit,
                    user_id,
                    license_status,
                    expires_from,
                    expires_to,
                    lang
                }
            ) => ({
                url: "/tenant-licenses",
                params: {
                    page,
                    limit,
                    user_id,
                    license_status,
                    expires_from,
                    expires_to,
                    lang
                }
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ tenant_license_id }) => ({ type: "userLicences" as const, tenant_license_id })),
                        { type: "userLicences", user_id: "LIST" }
                    ]
                    : [{ type: "userLicences", user_id: "LIST" }]
        }),
        updateStatus:builder.mutation<{success:boolean},{id:string, lang:string,status:string}>({
            query:({id, lang,status})=>({
                url:`/tenant-licenses/${id}/status`,
                params:{lang},
                method:"POST",
                body:{
                    license_status:status
                }
            }),
            invalidatesTags:['userLicences']
        }),
        blockerUser:builder.mutation<{success:boolean},{blocked:boolean, user_id:number}>({
            query:({blocked,user_id})=>({
                url:"/users/block",
                method:"POST",
                body:{
                    blocked,
                    user_id
                }
            }),
            invalidatesTags:['userLicences']
        })
    })

})


export const {
    useGetAllUserLicencesQuery,
    useLazyGetAllUserLicencesQuery,
    useUpdateStatusMutation,
    useBlockerUserMutation
} = userLicenceApi