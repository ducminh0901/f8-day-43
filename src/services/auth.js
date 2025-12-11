import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery,
    endpoints: (builder) => ({
        me: builder.query({
            query: () => "/auth/me",
        }),

        login: builder.mutation({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
        }),

        register: builder.mutation({
            query: (body) => ({
                url: "/auth/register",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useMeQuery, useLoginMutation, useRegisterMutation } = authApi;
