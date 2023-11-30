/* eslint-disable functional/no-expression-statements */
/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import fetchData from './fetchData.js';

const channelsAdapter = createEntityAdapter();
const generalChanelId = 1;

const initialState = {
  channels: [],
  currentChannelId: generalChanelId,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: { addChannel: channelsAdapter.addOne },
  extraReducers: (builder) => builder
    .addCase(fetchData.fulfilled, (state, action) => {
      state.channels = action.payload.channels;
      state.currentChannelId = action.payload.currentChannelId;
    }),
});

export const { addChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
