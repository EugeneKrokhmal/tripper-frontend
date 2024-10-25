import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Participant {
  _id: string;
  name: string;
  profilePicture?: string;
}

interface TripState {
  currentTripParticipants: Participant[];
  // Add any other trip-related fields you need
}

const initialState: TripState = {
  currentTripParticipants: [], // Initially no participants
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
