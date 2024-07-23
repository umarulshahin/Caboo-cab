import { createSlice } from "@reduxjs/toolkit";


const DriverSlice=createSlice({
    name:"driver_data",
    initialState:{
        driver_token:null,
        driver_data:null

    },
    reducers:{
        addDriver_token:(state,action)=>{
            state.driver_token=action.payload
        },
        addDriver_data:(state,action)=>{
            state.driver_data=action.payload
        }
    }

})

export const {addDriver_data,addDriver_token}=DriverSlice.actions;

export default DriverSlice.reducer;