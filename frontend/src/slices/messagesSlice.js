/* eslint-disable functional/no-expression-statements */
/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import fetchData from './fetchData.js';

const messagesAdapter = createEntityAdapter();

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: { addMessage: messagesAdapter.addOne },
  extraReducers: (builder) => builder
    .addCase(fetchData.fulfilled, (state, action) => {
      state.messages = action.payload.messages;
    }),
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
