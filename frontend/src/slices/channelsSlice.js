import { createSlice } from '@reduxjs/toolkit';

import fetchData from './fetchData';

const generalChannelId = 1;

const initialState = {
  channels: [],
  currentChannelId: generalChannelId,
};

const channelsSlice = createSlice({
  name: 'channels',

  initialState,

  reducers: {
    addChannel: (state, { payload }) => ({
      ...state,
      channels: [...state.channels, payload],
    }),

    changeCurrentChannel: (state, { payload }) => ({
      ...state,
      currentChannelId: payload,
    }),

    removeChannel: (state, { payload }) => {
      const newChannels = state.channels.filter((el) => el.id !== payload.id);

      const newCurrentChannelId = state.currentChannelId === payload.id
        ? generalChannelId
        : state.currentChannelId;

      return {
        ...state,
        channels: newChannels,
        currentChannelId: newCurrentChannelId,
      };
    },

    renameChannel: (state, { payload }) => {
      const { id, name } = payload;

      const newChannels = state.channels.map((el) => {
        if (el.id === id) {
          return { ...el, name };
        }
        return el;
      });

      return {
        ...state,
        channels: newChannels,
      };
    },
  },

  extraReducers: (builder) => builder
    .addCase(fetchData.fulfilled, (state, action) => ({
      ...state,
      channels: action.payload.channels,
      currentChannelId: action.payload.currentChannelId,
    })),
});

export const {
  addChannel,
  changeCurrentChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
