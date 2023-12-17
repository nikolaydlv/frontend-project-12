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

      return {
        ...state,
        modals: {
          ...state.modals,
          isShown: true,
          modalType: type,
          targetId,
        },
      };
    },

    closeModal: (state) => ({
      ...state,
      modals: {
        ...state.modals,
        isShown: false,
        modalType: '',
        targetId: null,
      },
    }),
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;
