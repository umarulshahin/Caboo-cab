import { createSlice } from "@reduxjs/toolkit";



const userSlice=createSlice({
    name:"user_data",
    initialState:{
        user_data:{},
        token_data:{}
    },
    reducers:{
        addUser:(state,action)=>{
           state.user_data=action.payload
        },
        addToken_data:(state,action)=>{
            state.token_data=action.payload
        }
    }

})
export const {addUser,addToken_data}=userSlice.actions

export default userSlice.reducer;
