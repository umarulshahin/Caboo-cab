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
        otpValidation:null,
        tripid:null,

        driverclintDetails:null,
        driver_driverRideDetails:null,
        driverrideLocations:null,
        driverrideDetails:null,
        driverrideDriverdetails:null,
        driverotpValidation:null,
        drivertripid:null,
        


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
            state.driverRideDetails=action.payload
        },
        addRideLocations:(state,action)=>{
            state.rideLocations=action.payload
        },
        addRideDetails:(state,action)=>{
            state.rideDetails=action.payload
        },
        addRideDriverdetails:(state,action)=>{
            state.rideDriverdetails=action.payload
        },
        addOTPvalidation:(state,action)=>{
            console.log('yes otp slice is working')
            state.otpValidation=action.payload
        },
        addTripId:(state,action)=>{
            state.tripid=action.payload
        },
        addClearRide:(state,action)=>{
            state.distance=action.payload
            state.charges=action.payload
            state.places=action.payload
            state.clintDetails=action.payload
            state.driverRideDetails=action.payload
            state.rideLocations=action.payload
            state.rideDetails=action.payload
            state.rideDriverdetails=action.payload
            state.otpValidation=action.payload
            state.tripid=action.payload
        },
        addDriverClint:(state,action)=>{
            state.driverclintDetails=action.payload
        },
        addDriver_driverRide:(state,action)=>{
            state.driver_driverRideDetails=action.payload
        },
        addDriverRideLocations:(state,action)=>{
            state.driverrideLocations=action.payload
        },
        addDriverRideDetails:(state,action)=>{
            state.driverrideDetails=action.payload
        },
        addDriverRideDriverdetails:(state,action)=>{
            state.driverrideDriverdetails=action.payload
        },
        addDriverOTPvalidation:(state,action)=>{
            console.log('yes otp verification is working')
            state.driverotpValidation=action.payload
        },
        addDriverTripId:(state,action)=>{
            state.drivertripid=action.payload
        },
        addDriverClearRide:(state,action)=>{
            
            state.driverclintDetails=action.payload
            state.driverrideLocations=action.payload
            state.driverrideDetails=action.payload
            state.driverrideDriverdetails=action.payload
            state.driverotpValidation=action.payload
            state.drivertripid=action.payload
            state.driver_driverRideDetails=action.payload
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
    addOTPvalidation,
    addClearRide,
    addTripId,
    
    addDriverClint,
    addDriver_driverRide,
    addDriverRideLocations,
    addDriverRideDetails,
    addDriverRideDriverdetails,
    addDriverOTPvalidation,
    addDriverTripId,
    addDriverClearRide


    }=RideSlice.actions;

export default RideSlice.reducer