
import axios from 'axios'
import Cookies from "js-cookie"
import { useDispatch } from 'react-redux'
import { addDriver_list, addUsers_list } from '../Redux/AdminSlice'
import { get_Driver_url, get_Users_url } from '../Utils/Constanse'

const useAdmin = () => {

    const dispatch=useDispatch()
    const GetUsers=async(urls,role=null)=>{

        try{
           const raw_token=Cookies.get("adminTokens")
           const token=JSON.parse(raw_token)
           console.log(token.access)
           
       
         const response = await axios.get(urls,{
            headers: {
              Authorization: `Bearer ${token.access}`,
              "Content-Type": "multipart/form-data",
            },
          });

         if(response.status===200){
            console.log(response.data)
            if(role==="driver"){
                console.log("yes")
             dispatch(addDriver_list(response.data))
             return

            }else if(role==="user"){
                console.log("yes working")
                dispatch(addUsers_list(response.data))
                return

            }
         }

        }catch(error){
            console.error(error,"get users")
        }
    }

    const Usermanagement=async(urls,value)=>{
        try{
            const raw_token=Cookies.get("adminTokens")
            const token=JSON.parse(raw_token)

            const response= await axios.post(urls,value,{
                headers:{
                    Authorization: `Bearer ${token.access}`,
                    "Content-Type" : "multipart/form-data",
                }
            })

            if (response.status===200){

                console.log(response.data)
              
                GetUsers(get_Users_url,"user")
                GetUsers(get_Driver_url,"driver")

            }
        }catch(error){
            console.error(error,"Usermanagment")

        }
    }

    const Driver_Management= async()=>{
         
    }
    return {GetUsers,Usermanagement}
}
export default useAdmin