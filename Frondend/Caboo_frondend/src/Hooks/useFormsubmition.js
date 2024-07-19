import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addOTP, addsignup_data } from '../Redux/SignupSlice';
import { useNavigate } from 'react-router-dom';

const useFormsubmition = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const FormSubmition = async (values, url) => {
        try {
            const response = await axios.post(url,values, {

                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (response.status === 200) {
                console.log(response.data.user_data, 'signup response');
                dispatch(addsignup_data(response.data.user_data))
                dispatch(addOTP(response.data.otp))
                navigate('/otpverify')



            }else if (response.status===400){
                console.log(response.data, 'signup response');

            }


        } catch (error) {
            console.log(error.response.data)
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
                console.log(response.data,"modalform response")
            }
        }catch(error){
          console.error(error,"Modalform error")
        }
       

        

    }
    
    return { FormSubmition,Modalforms};

};

export default useFormsubmition;
