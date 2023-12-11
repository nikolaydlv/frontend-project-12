/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import fetchData from './fetchData.js';

const generalChannelId = 1;

const initialState = {
  channels: [],
  currentChannelId: generalChannelId,
};

const channelsSlice = createSlice({
  name: 'channels',

  initialState,

  reducers: {
    addChannel: (state, { payload }) => {
      state.channels = [...state.channels, payload];
    },

    changeCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },

    removeChannel: (state, { payload }) => {
      state.channels = state.channels.filter((el) => el.id !== payload.id);

      if (state.currentChannelId === payload.id) {
        state.currentChannelId = generalChannelId;
      }
    },

    renameChannel: (state, { payload }) => {
      const { id, name } = payload;
      state.channels.find((el) => el.id === id).name = name;
    },
  },

  extraReducers: (builder) => builder
    .addCase(fetchData.fulfilled, (state, action) => {
      state.channels = action.payload.channels;
      state.currentChannelId = action.payload.currentChannelId;
    }),
});

export const {
  addChannel,
  changeCurrentChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
