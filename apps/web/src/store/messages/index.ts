import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../auth";

interface Message {
  id: number;
  channelId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface MessageState {
  data: Message[];
}

const initialState: MessageState = {
  data: [
    {
      id: 1,
      channelId: 1,
      content: "Hello, World!",
      createdAt: "2021-08-15T00:00:00Z",
      updatedAt: "2021-08-15T00:00:00Z",
      user: {
        id: 2,
        email: "fred@example.com",
        name: "Fred",
      },
    },
    {
      id: 2,
      channelId: 1,
      content: "This is a test message.",
      createdAt: "2021-08-15T00:00:00Z",
      updatedAt: "2021-08-15T00:00:00Z",
      user: {
        id: 3,
        email: "sarah@example.com",
        name: "Sarah",
      },
    },
    {
      id: 3,
      channelId: 2,
      content: "This is a random message.",
      createdAt: "2021-08-15T00:00:00Z",
      updatedAt: "2021-08-15T00:00:00Z",
      user: {
        id: 1,
        email: "tom@example.com",
        name: "Tom",
      },
    },
  ],
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<Pick<Message, `channelId` | `content` | `user`>>
    ) => {
      state.data.unshift({
        id: state.data.length + 1,
        channelId: action.payload.channelId,
        content: action.payload.content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: action.payload.user,
      });
    },
  },
});

export const { addMessage } = messageSlice.actions;

export default messageSlice.reducer;
