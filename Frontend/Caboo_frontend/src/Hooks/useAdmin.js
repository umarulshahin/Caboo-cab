
import { useDispatch } from 'react-redux'
import { addAllTrips, addDriver_list, addUsers_list } from '../Redux/AdminSlice'
import { Get_all_trips_url, get_Driver_url, get_Users_url } from '../Utils/Constanse'
import { toast } from 'sonner'
import AdminAxios from '../Axios/AdminAxios'
import { useNavigate } from 'react-router-dom'

const useAdmin = () => {

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const GetUsers=async(urls,role=null)=>{

        try{
           
         const response = await AdminAxios.get(urls,{
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

         if(response.status===200){
            console.log(response.data,)
            console.log(role)
            if(role==="driver"){
              dispatch(addDriver_list(response.data))
              return

            }else if(role==="user"){
                console.log('yes working user')
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
            const response= await AdminAxios.post(urls,value,{
                headers:{
                    "Content-Type" : "multipart/form-data",
                }
            })

            if (response.status===200){

                console.log(response.data,'user managment')
                toast.success("status successfully updated")
                return
            }
        }catch(error){
            console.error(error,"Usermanagment")

        }
    }

    const GetTripdata=async(data)=>{
        try{
            console.log(data,'data in get trips')
            const responds = await AdminAxios.get(Get_all_trips_url,{
                params:data,
                headers:{

                    "Content-Type":"application/json"
                }
            })
            if (responds.status===200){
                console.log(responds.data)
                dispatch(addAllTrips(responds.data))
            }
            
        }catch(error){
            console.log(error,'get trip data')
        }
    }

    const CouponManage= async (url,data)=>{
      
        try{
            console.log(url,'url ')
            console.log(data,'data')
            const response = await AdminAxios.post(url,data,{
                
                headers:{
                    "Content-Type" : "multipart/form-data",
                }
            })

            if (response.status === 201){
                console.log(response.data,'coupon manage')
            }
            console.log(response,'response')
        }catch(error){
            console.log(error,'couponManage')
        }
    }

    return {GetUsers,Usermanagement,GetTripdata,CouponManage}
}
export default useAdmin