import  { useEffect, useState } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import useGetUser from '../../Hooks/useGetUser';
import { signin_urls } from '../../Utils/Constanse';
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom';

const Password = () => {

  const email=useSelector((state)=>state.signup_data.email)
  const { signin }=useGetUser()
  const [errormessage,seterrormessage]=useState('')
  const Navigate=useNavigate()
  const initialValues = {
    password: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
  });


  const onSubmit = (values) => {
    values["email"]=email.email

    console.log(values);
    signin(values,signin_urls,seterrormessage)
      
  };

  
  useEffect(()=>{  

    const user_token=Cookies.get("userTokens")
    if(user_token){
 
     Navigate('/userhome')
 
    }
 
     },[])

  return (
    <div className="bg-white h-80 text-black flex flex-col justify-center items-center">
      <div className=''>
        <span className="text-2xl font-bold pr-16">Enter your password</span>
      </div>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="my-4 relative w-full text-lg font-bold">
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                className="mt-1 block w-72 py-2 px-4 border border-gray-300 rounded-md text-black"
              />
              <span className='text-red-500 text-sm mt-1'>{errormessage ? errormessage:''}</span>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mt-3">
              <button
                type="submit"
                className="bg-yellow-500 w-72 text-black px-4 py-2 rounded-md font-bold"
              >
                Continue
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Password;
