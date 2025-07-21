import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryPrivate } from "../../redux/baseUrl";
import { pagination } from "../../interfaces/user.interface";
import { LicenceRequest, LicenceResponse } from "./type";

export const licenceApi = createApi({
    reducerPath: "licenceApi",
    baseQuery: baseQueryPrivate,
    tagTypes: ['licences'],
    endpoints: (builder) => ({
        getAllLicences: builder.query<pagination<LicenceResponse>, { page: number, limit: number }>({
            query: ({ page, limit }) => ({
                url: "/license-plans",
                params: { page, limit }
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ plan_id }) => ({ type: "licences" as const, plan_id })),
                        { type: "licences", user_id: "LIST" }
                    ]
                    : [{ type: "licences", user_id: "LIST" }]
        }),
        createLicence:builder.mutation<{success:boolean},LicenceRequest>({
            query:(credential)=>({
                url:"/license-plans",
                method:"POST",
                body:credential
            }),
            invalidatesTags:['licences']
        }),
        deleteLicence:builder.mutation<{success:boolean}, string>({
            query:(id)=>({
                url:`/license-plans/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:['licences']
        }),
        updateLicence:builder.mutation<{success:boolean},{id:string, credential:LicenceResponse}>({
            query:({id,credential})=>({
                url:`/license-plans/${id}`,
                method:"PUT",
                body:credential
            }),
            invalidatesTags:['licences']
        })
    })
})

export const {
    useGetAllLicencesQuery,
    useLazyGetAllLicencesQuery,
    useCreateLicenceMutation,
    useDeleteLicenceMutation,
    useUpdateLicenceMutation
} = licenceApi