import { toast } from 'sonner';
import { addemail, addUser_status } from '../Redux/AuthenticationSlice';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useAuthentication = () => {
      
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const role = useSelector((state)=>state.Authentication.role)
    const user_status =useSelector((state)=>state.Authentication.user_status)

    console.log(user_status,role)
    const Emailvalidation= async(values,urls)=>{

        try{
            const response = await axios.post(urls,values,{
                headers:{
                    "Content-Type":"application/json",
                }
            });

            if(response.status===200){

                if(response.data.success==="alredy email exist"){
                    
                    dispatch(addemail(response.data.data))
                    dispatch(addUser_status(response.data.success))
                    navigate('/signin_selection', { state: { modal: 'OTP verify' } });

                }else if(response.data.success==="New user"){

                    dispatch(addUser_status(response.data.success))
                    dispatch(addemail(response.data.email))
                    navigate('/signin_selection', { state: { modal: 'OTP verify' } });

                }else if(response.status==="User is not active"){

                    toast.warning("Your account is Blocked ")
                    return

                }

            }
        }catch(error){

          console.error(error,"Modalform error")
        }
       
    }

    const Otp_verification=async(values,urls,seterrormessage)=>{

        try{
            const response= await axios.post(urls,values,{
                headers:{
                    'Content-Type':'application/json'
                }
            });

            if(response.status===200){
                console.log(response.data)

                if(response.data.success){
                    
                    // navigate('/signup')
                    if(user_status==='New user'){

                        navigate('/signup')

                    }else if(user_status==='alredy email exist' && role === 'Ride'){
                         
                    }else if (user_status==='alredy email exist' && role === 'Drive'){

                    }

                }else if (response.data.error){

                    seterrormessage("Invalid OTP enterd")

                }
            }
            
        }catch(error){

            console.log(error,'otpverification ')
        }
       
    }

    return {Emailvalidation,Otp_verification}


}

export default useAuthentication