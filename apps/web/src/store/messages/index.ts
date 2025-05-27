import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Message } from "@backend/types";

export interface MessageState {
  data: Message[];
}

const initialState: MessageState = {
  data: [],
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessages: (state, action: PayloadAction<Message[]>) => {
      state.data.push(...action.payload);
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.data.unshift(action.payload);
    },
  },
});

export const { addMessage, addMessages } = messageSlice.actions;

export default messageSlice.reducer;
