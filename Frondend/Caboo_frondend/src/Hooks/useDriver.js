import { useDispatch } from 'react-redux';
import DriverAxios from '../Axios/DriverAxios';
import { addDriver_data } from '../Redux/DriverSlice';
import { toast } from 'sonner';

const useDriver = () => {
    const dispatch=useDispatch()
    const Driver_status =async(urls,values)=>{
        
        try{
            const response = await DriverAxios.patch(urls,values,{
                
                headers: {
                    "Content-Type": "multipart/form-data",
                  },
            })
            if (response.status===200){
                if (response.data.current_Status){
                    toast.success('Online')
                }else{
                    toast.info("Offline")
                }
                const data=[response.data]
                dispatch(addDriver_data(data))
            } 
        }catch(error){
            console.error("Driver status",error)
        }
    }

    return {Driver_status}
};

export default useDriver;
