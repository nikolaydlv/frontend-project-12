import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes';

const fetchData = createAsyncThunk(
  'data/fetchData',
  async (token) => {
    const { data } = await axios.get(routes.dataPath(), { headers: { Authorization: `Bearer ${token}` } });

    return data;
  },
);

export default fetchData;
