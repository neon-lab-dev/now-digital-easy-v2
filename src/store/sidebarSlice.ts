import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
  isSidebarOpen: boolean;
}

// Define the initial state
const initialState: SidebarState = {
  isSidebarOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setIsSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setIsSidebarOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;
