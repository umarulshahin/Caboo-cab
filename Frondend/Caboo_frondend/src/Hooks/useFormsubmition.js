import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import useGetUser from './useGetUser';
import { signin_urls } from '../Utils/Constanse';
import { addDriver_data } from '../Redux/DriverSlice';
import { addemail } from '../Redux/AuthenticationSlice';

const useFormsubmition = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const { signin }=useGetUser()

    const FormSubmition = async (values, url) => {
        try {
            const response = await axios.post(url,values, {

                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (response.status === 200) {


                if(response.data.success==="success"){

                    console.log(response.data.data.role)
                    if(response.data.data.role==='driver'){
                       console.log(response.data)
                       dispatch(addDriver_data(response.data))
                       navigate('/vehicle_doc')

                    }else{
                             const data={
                                email:response.data.data.email,
                                password:response.data.password
                            }
                            toast.success("Congratulations! Your account has been successfully created")

                            // signin(data,signin_urls)
                    }
                    


                }else {

                    toast.warning(response.data.error&&response.data.error.email ? "Email already exist":"Phone number already exists" )

                }
                // dispatch(addsignup_data(response.data.user_data))

            }else if (response.status===400){
                console.log(response.data, 'signup response');

            }

        } catch (error) {
            console.error('Error submitting form:', error);

        }
    };

    const Modalforms= async(values,urls)=>{

        try{
            const response = await axios.post(urls,values,{
                headers:{
                    "Content-Type":"application/json",

                }
            });

            if(response.status===200){
                if(response.data.success==="OTP sent"){
                    dispatch(addemail(response.data.data))
                    navigate('/signin_selection', { state: { modal: 'OTP verify' } });

                }else if(response.data.success==="alredy email exist"){
                    console.log(response.data.email)
                    dispatch(addemail(response.data.email))
                    navigate('/signin_selection', { state: { modal: 'password' } });


                }

            }
        }catch(error){

          console.error(error,"Modalform error")
        }
       
    }

    const otpverify=async(values,urls,seterrormessage)=>{
        console.log(values)
        try{
            const response= await axios.post(urls,values,{
                headers:{
                    'Content-Type':'application/json'
                }
            });

            if(response.status===200){
                console.log(response.data)

                if(response.data.success){
                    navigate('/signup')

                }else if (response.data.error){

                    seterrormessage("Invalid OTP enterd")

                }
            }
            
        }catch(error){

            console.log(error,'otpverification ')
        }
       
    }
    
    return { FormSubmition,Modalforms,otpverify};

};

export default useFormsubmition;
