/* eslint-disable functional/no-expression-statements */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modals: {
    isShown: false,
    modalType: '',
    targetId: null,
  },
};

const modalsSlice = createSlice({
  name: 'modals',

  initialState,

  reducers: {
    openModal: (state, { payload }) => {
      const { type, targetId } = payload;

      state.modals.isShown = true;
      state.modals.modalType = type;
      state.modals.targetId = targetId;
    },

    closeModal: (state) => {
      state.modals.isShown = false;
      state.modals.modalType = '';
      state.modals.targetId = null;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;
