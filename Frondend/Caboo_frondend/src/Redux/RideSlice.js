import { createSlice } from "@reduxjs/toolkit";



const RideSlice=createSlice({
     
    name:"Ride_state",
    initialState:{
        distance:null,
        charges:null,
        places:null,

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
        }
    }
})

export const{addCharges,addDistance,addPlaces}=RideSlice.actions

export default RideSlice.reducer