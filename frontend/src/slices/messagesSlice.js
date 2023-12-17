import { createSlice } from '@reduxjs/toolkit';

import fetchData from './fetchData';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',

  initialState,

  reducers: {
    addMessage: (state, { payload }) => ({
      ...state,
      messages: [...state.messages, payload],
    }),

    removeAllChannelMessages: (state, { payload }) => ({
      ...state,
      messages: state.messages.filter((el) => el.channelId !== payload.id),
    }),
  },

  extraReducers: (builder) => builder
    .addCase(fetchData.fulfilled, (state, { payload }) => ({
      ...state,
      messages: payload.messages,
    })),
});

export const { addMessage, removeAllChannelMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
