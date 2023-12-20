/* eslint-disable no-param-reassign */

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import fetchDataThunk from './thunks';

const defaultChannelId = 1;

const statuses = {
  notLoaded: 'notLoaded',
  loading: 'loading',
  loaded: 'loaded',
  loadError: 'loadError',
};

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
  loadingStatus: statuses.notLoaded,
  error: null,
});

const channelsSlice = createSlice({
  name: 'channels',

  initialState,

  reducers: {
    addChannel: channelsAdapter.addOne,

    renameChannel: channelsAdapter.updateOne,

    switchChannel: (state, action) => {
      state.currentChannelId = action.payload.id;
    },

    removeChannel: (state, { payload }) => {
      const removeChannelId = payload;
      const activeChannelId = state.currentChannelId;
      state.currentChannelId = (removeChannelId === activeChannelId)
        ? defaultChannelId
        : state.currentChannelId;
      channelsAdapter.removeOne(state, removeChannelId);
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchDataThunk.fulfilled, (state, action) => {
        channelsAdapter.setAll(state, action.payload.channels);
        state.currentChannelId = action.payload.currentChannelId;
        state.loadingStatus = statuses.loaded;
        state.error = null;
      })
      .addCase(fetchDataThunk.pending, (state) => {
        state.loadingStatus = statuses.loading;
        state.error = null;
      })
      .addCase(fetchDataThunk.rejected, (state, action) => {
        state.loadingStatus = statuses.loadError;
        state.error = action.payload;
      });
  },
});

const { actions } = channelsSlice;

const selectors = channelsAdapter.getSelectors((state) => state.channels);

const customSelectors = {
  selectAll: selectors.selectAll,

  selectById: selectors.selectById,

  selectCurrentChannelId: (state) => state.channels.currentChannelId,

  selectCurrentChannel: (state) => {
    const { currentChannelId } = state.channels;
    return selectors.selectById(state, currentChannelId);
  },

  selectChannelsNames: (state) => {
    const channels = selectors.selectAll(state);
    return channels.map(({ name }) => name);
  },

};

export { actions, customSelectors as selectors };

export default channelsSlice.reducer;
