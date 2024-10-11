import { createSlice } from "@reduxjs/toolkit";


const AdminSlice = createSlice({
    name:"admin_data",
    initialState:{
        admin_token:{},
        admin_data:{},
        users_list:{},
        Driver_list:{},
        allTrips:{},
        coupons:{}
    },
    reducers:{
        addadmin_token:(state,action)=>{
            state.admin_token=action.payload
        },
        addadmin_data:(state,action)=>{
            state.admin_data=action.payload
        },
        addUsers_list:(state,action)=>{
            state.users_list=action.payload
        },
        addDriver_list:(state,action)=>{
            state.Driver_list=action.payload
        },
        addAllTrips:(state,action)=>{
            state.allTrips=action.payload
        },
        addCoupons:(state,action)=>{
            state.coupons=action.payload
        },
        ClearAdmin:(state,action)=>{
            state.admin_data={}
            state.admin_token={}
            state.users_list={}
            state.Driver_list={}
            state.allTrips={}
            state.coupons={}
        }    }
})

export const {addadmin_data,addadmin_token,addUsers_list,addDriver_list,addAllTrips,addCoupons}=AdminSlice.actions

export default AdminSlice.reducer;