import { configureStore } from "@reduxjs/toolkit";
import channelReducer from "./channels";
import messageReducer from "./messages";
import authReducer from "./auth";
import { backendApi } from "./api";

export const store = configureStore({
  reducer: {
    [backendApi.reducerPath]: backendApi.reducer,
    channels: channelReducer,
    messages: messageReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(backendApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
