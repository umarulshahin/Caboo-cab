import { createSlice } from "@reduxjs/toolkit";



const AdminSlice = createSlice({
    name:"admin_data",
    initialState:{
        admin_token:{},
        admin_data:{}
    },
    reducers:{
        addadmin_token:(state,action)=>{
            state.admin_token=action.payload
        },
        addadmin_data:(state,action)=>{
            state.admin_data=action.payload
        }
    }
})

export const {addadmin_data,addadmin_token}=AdminSlice.actions

export default AdminSlice.reducer;