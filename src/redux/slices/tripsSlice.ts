import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Participant {
  _id: string;
  name: string;
  profilePicture?: string;
}

interface TripState {
  currentTripParticipants: Participant[];
}

const initialState: TripState = {
  currentTripParticipants: [],
};

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    setParticipants: (state, action: PayloadAction<Participant[]>) => {
      state.currentTripParticipants = action.payload;
    },
    clearTrip: (state) => {
      state.currentTripParticipants = [];
    },
  },
});

export const { setParticipants, clearTrip } = tripsSlice.actions;
export default tripsSlice.reducer;
