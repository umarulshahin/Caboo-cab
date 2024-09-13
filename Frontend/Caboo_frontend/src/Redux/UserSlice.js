import { createSlice } from "@reduxjs/toolkit";



const userSlice=createSlice({
    name:"user_data",
    initialState:{
        user_data:{},
        token_data:{},
        userTrips:{},
        walletdetails:{}
    },
    reducers:{
        addUser:(state,action)=>{
    
           state.user_data=action.payload
        },
        addToken_data:(state,action)=>{
         
            state.token_data=action.payload
        },
        addUserTrips:(state,action)=>{
            state.userTrips=action.payload
        },
        addWalletDetails:(state,action)=>{
            state.walletdetails=action.payload
        }
    }

})
export const {addUser,addToken_data,addUserTrips,addWalletDetails}=userSlice.actions

export default userSlice.reducer;
