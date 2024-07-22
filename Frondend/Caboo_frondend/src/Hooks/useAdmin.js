
import axios from 'axios'
import Cookies from "js-cookie"
import { get_Users_url } from '../Utils/Constanse'
import { useDispatch } from 'react-redux'
import { addUsers_list } from '../Redux/AdminSlice'
const useAdmin = () => {
    const dispatch=useDispatch()
    const GetUsers=async()=>{

        try{
           const raw_token=Cookies.get("adminTokens")
           const token=JSON.parse(raw_token)

         const response= await axios.get(get_Users_url,{
            headers:{
               
                Authorization: `Bearer ${token.access}`,
                "Content-Type": "multipart/form-data",
            }
         });

         if(response.status===200){

            dispatch(addUsers_list(response.data))
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
                GetUsers()
            }
        }catch(error){
            console.error(error,"Usermanagment")

        }
    }
    return {GetUsers,Usermanagement}
}
export default useAdmin