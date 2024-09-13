import { createSlice } from "@reduxjs/toolkit";


const Chatslice=createSlice({
    name:'Chat',
    initialState:{
        userMessage:[],
        driverMessage:[],
      

    },
    reducers:{
        adduserMessage:(state,action)=>{
            state.userMessage=state.userMessage.concat(action.payload)
        },
        adddriverMessage:(state,action)=>{
            state.driverMessage=state.driverMessage.concat(action.payload)
        },
        addClearChat:(state,action)=>{
            state.userMessage=[]
            state.driverMessage=[]
        }
    
    }
})

export const {adddriverMessage,adduserMessage,addClearChat}=Chatslice.actions

export default Chatslice.reducer