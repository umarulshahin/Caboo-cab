import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addemail} from '../Redux/SignupSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import useGetUser from './useGetUser';
import { signin_urls } from '../Utils/Constanse';

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

                console.log(response.data, 'signup response');
                console.log(response.data.data.email, 'signup response');
                console.log(response.data.password, 'signup response');


                if(response.data.success==="success"){

                    toast.success("Congratulations! Your account has been successfully created")
                    
                    const data={
                        email:response.data.data.email,
                        password:response.data.password
                    }
                    console.log(data)

                    signin(data,signin_urls)


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
                if(response.data.success==="Otp sended"){

                    dispatch(addemail(response.data.email))
                    navigate('/signin_selection', { state: { modal: 'OTP verify' } });

                }else if(response.data.success==="alredy email exist"){
                    console.log(response.data)
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
