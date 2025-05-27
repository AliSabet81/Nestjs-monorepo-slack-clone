import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Channel } from "@backend/types/index";

export interface ChannelState {
  data: Channel[];
  activeChannelId: number | null;
}

const initialState: ChannelState = {
  data: [],
  activeChannelId: null,
};

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    addChannels: (state, action: PayloadAction<Channel[]>) => {
      state.data = action.payload;
    },
    addChannel: (state, action: PayloadAction<Channel>) => {
      state.data.push(action.payload);
    },
    setActiveChannel: (state, action: PayloadAction<{ id: number }>) => {
      state.activeChannelId = action.payload.id;
    },
  },
});

export const { addChannel, setActiveChannel, addChannels } =
  channelSlice.actions;

export default channelSlice.reducer;
