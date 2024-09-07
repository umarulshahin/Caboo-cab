import { createSlice } from "@reduxjs/toolkit";


const DriverSlice=createSlice({
    name:"driver_data",
    initialState:{
        driver_token:null,
        driver_data:null,
        driverTrips:{}

    },

    reducers:{
        addDriver_token:(state,action)=>{
            console.log(state,'driver state data')

            console.log('add driver token slice')
            state.driver_token=action.payload
        },
        addDriver_data:(state,action)=>{
            console.log(state,'driver data slice')
            console.log('add driver data slice')
            state.driver_data=action.payload
        },
        addDriverTrips:(state,action)=>{
            state.driverTrips=action.payload
        }
    }
})

export const {addDriver_data,addDriver_token,addDriverTrips}=DriverSlice.actions;

export default DriverSlice.reducer;