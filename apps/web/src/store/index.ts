import { configureStore } from "@reduxjs/toolkit";
import channelReducer from "./channels";
import messageReducer from "./messages";
import authReducer from "./auth";

export const store = configureStore({
  reducer: {
    channels: channelReducer,
    messages: messageReducer,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
