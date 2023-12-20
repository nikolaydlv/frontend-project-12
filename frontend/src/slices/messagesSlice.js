import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messageSlice = createSlice({
  name: 'messages',

  initialState,

  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },

  extraReducers: (builder) => {
    builder.addCase(channelsActions.removeChannel, (state, action) => {
      const messagesToRemove = Object.values(state.entities)
        .filter((message) => message.channelId === action.payload)
        .map((message) => message.id);

      messagesAdapter.removeMany(state, messagesToRemove);
    });
  },
});

const { actions } = messageSlice;

const selectors = messagesAdapter.getSelectors((state) => state.messages);

const customSelectors = {
  selectAll: selectors.selectAll,

  selectById: (state) => {
    const { currentChannelId } = state.channels;
    const messages = selectors.selectAll(state);
    return messages.filter(({ channelId }) => channelId === currentChannelId);
  },

};

export { actions, customSelectors as selectors };

export default messageSlice.reducer;
