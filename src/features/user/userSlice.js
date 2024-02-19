import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {
      token: "",
      userData: {
        name: "",
        email: "",
        phoneNumber: null,
        _id: "",
      },
    },
  },
  reducers: {
    setUserData: (state, action) => {
      // console.log("Data provided to store", action.payload)
      console.log("State provided to store", action.payload);
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
