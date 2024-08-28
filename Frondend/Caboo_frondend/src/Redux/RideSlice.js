import { createSlice } from "@reduxjs/toolkit";



const RideSlice=createSlice({
     
    name:"Ride_state",
    initialState:{
        distance:null,
        charges:null,
        places:null,
        clintDetails:null,
        driverRideDetails:null,
        rideLocations:null,
        rideDetails:null,
        rideDriverdetails:null,
        otpValidation:null

    },
    reducers:{
        addDistance:(state,action)=>{
            state.distance=action.payload
        },
        addCharges:(state,action)=>{
            state.charges=action.payload
        },
        addPlaces:(state,action)=>{
            state.places=action.payload
        },
        addClint:(state,action)=>{
            state.clintDetails=action.payload
        },
        addDriverRide:(state,action)=>{
            console.log('yes driver ride is working ')
            state.driverRideDetails=action.payload
        },
        addRideLocations:(state,action)=>{
            console.log('yes ride location is working')
            state.rideLocations=action.payload
        },
        addRideDetails:(state,action)=>{
            state.rideDetails=action.payload
        },
        addRideDriverdetails:(state,action)=>{
            state.rideDriverdetails=action.payload
        },
        addOTPvalidation:(state,action)=>{
            state.otpValidation=action.payload
        }


    }
})

export const{addCharges,
    addDistance,
    addPlaces,
    addClint,
    addDriverRide,
    addRideLocations,
    addRideDetails,
    addRideDriverdetails,
    addOTPvalidation
    }=RideSlice.actions;

export default RideSlice.reducer