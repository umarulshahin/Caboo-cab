import { createSlice } from "@reduxjs/toolkit";



const userSlice=createSlice({
    name:"user_data",
    initialState:{
        user_data:{},
        token_data:{}
    },
    reducers:{
        addUser:(state,action)=>{
            console.log(state,'user token slice')
            console.log(state.token_data,'user token slice data')
           state.user_data=action.payload
        },
        addToken_data:(state,action)=>{
            console.log(state,'user get data slice')
            console.log(state.user_data,'user slice get data')
            state.token_data=action.payload
        }
    }

})
export const {addUser,addToken_data}=userSlice.actions

export default userSlice.reducer;
