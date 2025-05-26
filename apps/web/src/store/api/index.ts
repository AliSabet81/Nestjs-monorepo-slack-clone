import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../auth";

export const backendApi = createApi({
  reducerPath: `backendApi`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_API,
  }),
  endpoints: (builder) => ({
    googleAuth: builder.mutation<User, string>({
      query: (credentials: string) => ({
        url: `/auth/google`,
        method: `POST`,
        body: {
          token: credentials,
        },
      }),
    }),
  }),
});

export const { useGoogleAuthMutation } = backendApi;
