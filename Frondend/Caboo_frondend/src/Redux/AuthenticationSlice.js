import { createSlice } from "@reduxjs/toolkit";

const AuthenticationSlice = createSlice({
  name: "signup_data",
  initialState: {
    email:{},
    user_status:'',
    role:''

  },
  reducers: {
  
    addemail:(state,action)=>{
      state.email=action.payload
    },
    addUser_status:(state,action)=>{
      state.user_status=action.payload
    },
    addrole:(state,action)=>{
      state.role=action.payload
    }
  },
});

export const { addemail,addUser_status,addrole } = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
