import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchAllData from '../ChatApi/fetchData';

const fetchDataThunk = createAsyncThunk(
  'fetchInitialData',
  async (header, { rejectWithValue }) => {
    try {
      return await fetchAllData(header);
    } catch (error) {
      return rejectWithValue({ message: error.message, errorCode: error.response.status });
    }
  },
);

export default fetchDataThunk;
