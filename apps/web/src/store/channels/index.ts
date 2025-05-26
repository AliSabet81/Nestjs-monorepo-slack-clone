import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ChannelState {
  data: { id: number; name: string }[];
  activeChannelId: number | null;
}

const initialState: ChannelState = {
  data: [
    { id: 1, name: "general" },
    { id: 2, name: "random" },
  ],
  activeChannelId: null,
};

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    addChannel: (state, action: PayloadAction<{ name: string }>) => {
      state.data.push({ id: state.data.length + 1, name: action.payload.name });
    },
    setActiveChannel: (state, action: PayloadAction<{ id: number }>) => {
      state.activeChannelId = action.payload.id;
    },
  },
});

export const { addChannel, setActiveChannel } = channelSlice.actions;

export default channelSlice.reducer;
