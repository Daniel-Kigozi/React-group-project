import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://api.spacexdata.com/v4/rockets';
const ROCKETS = 'ROCKETS';

const initialState = [];

export const fetchRockets = createAsyncThunk(ROCKETS, async () => {
  const response = await axios.get(URL);
  return response.data;
});

const rocketSlice = createSlice({
  name: 'rockets',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRockets.fulfilled, (state, action) => {
      const arr = action.payload.map((rocket) => ({
        id: rocket.id,
        rocketName: rocket.rocket_name,
        reserved: false,
        description: rocket.description,
        flickrImages: rocket.flickr_images,
      }));
      state.push(...arr);
    });
  },
});

export default rocketSlice.reducer;
