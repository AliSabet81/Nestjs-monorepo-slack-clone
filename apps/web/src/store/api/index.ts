import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { store } from "..";
import { Channel, User, Message } from "@backend/types";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API,
  credentials: `include`,
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: `/auth/refresh`,
        method: `POST`,
      },
      api,
      extraOptions
    );
    if (refreshResult.data) {
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      // need to logout the user

      const { isAuthenticated } = store.getState().auth;
      if (isAuthenticated) {
        await baseQuery(
          { url: "/auth/logout", method: "POST" },
          api,
          extraOptions
        );
        store.dispatch({ type: "logout" });
      }
    }
  }
  return result;
};

export const backendAuthApi = createApi({
  reducerPath: `backendAuthApi`,
  baseQuery,
  endpoints: (builder) => ({
    googleAuth: builder.mutation<{ data: User }, string>({
      query: (credentials: string) => ({
        url: `/auth/google`,
        method: `POST`,
        body: {
          token: credentials,
        },
      }),
    }),
    logout: builder.mutation<string, undefined>({
      query: () => ({
        url: `/auth/logout`,
        method: `POST`,
      }),
    }),
  }),
});

export const backendApi = createApi({
  reducerPath: `backendApi`,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getCurrentUser: builder.query<{ data: User }, undefined>({
      query: () => ({
        url: `/user`,
        method: `GET`,
      }),
    }),
    getChannels: builder.query<{ data: Channel[] }, undefined>({
      query: () => ({
        url: `/channel`,
        method: `GET`,
      }),
    }),
  }),
});

export const { useGoogleAuthMutation, useLogoutMutation } = backendAuthApi;
export const { useGetCurrentUserQuery, useGetChannelsQuery } = backendApi;
