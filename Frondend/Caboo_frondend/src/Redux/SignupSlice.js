import { createSlice } from "@reduxjs/toolkit";

const signup_dataSlice = createSlice({
  name: "signup_data",
  initialState: {
    user_data: {}, 
    otp: null 

  },
  reducers: {
    addsignup_data: (state, action) => {
      state.user_data = action.payload;  // Ensure the payload structure matches what you expect
    },
    addOTP:(state,action)=>{
        state.otp=action.payload
    }
  },
});

export const { addsignup_data,addOTP } = signup_dataSlice.actions;

export default signup_dataSlice.reducer;
