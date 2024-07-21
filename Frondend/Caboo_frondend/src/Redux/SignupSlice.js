import { createSlice } from "@reduxjs/toolkit";

const signup_dataSlice = createSlice({
  name: "signup_data",
  initialState: {
    email:null

  },
  reducers: {
  
    addemail:(state,action)=>{
      state.email=action.payload
    }
  },
});

export const { addemail } = signup_dataSlice.actions;

export default signup_dataSlice.reducer;
