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
           
            state.driver_token=action.payload
        },
        addDriver_data:(state,action)=>{
         

            state.driver_data=action.payload
        },
        addDriverTrips:(state,action)=>{
            state.driverTrips=action.payload
        },
        addClearDriver:(state,action)=>{
           state.driver_token=null
           state.driver_data=null
           state.driverTrips=null


        }
    }
})

export const {addDriver_data,addDriver_token,addDriverTrips,addClearDriver}=DriverSlice.actions;

export default DriverSlice.reducer;