// Redux
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Types
import { type ConditionsT } from "@/lib/types/data";

type DataState = {
  string: string | undefined;
  conditions: ConditionsT | undefined;
};

const initialState: DataState = {
  string: "PETRICHOR",
  conditions: undefined,
};

const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    string: (state, action: PayloadAction<string>) => {
      return { ...state, string: action.payload };
    },
    conditions: (state, action: PayloadAction<ConditionsT>) => {
      return { ...state, conditions: action.payload };
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice.reducer;
