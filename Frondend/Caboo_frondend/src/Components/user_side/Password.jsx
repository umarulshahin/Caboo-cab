import React from 'react'
// Signin_form.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import google_icon from '../../assets/Google_icon.png';

const Password = () => {

    
  const initialValues = {
    Password: '',
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
    console.log(values);
  };

  return (
    <div className=" bg-white h-80 text-black flex flex-col justify-center items-center">
      <div className=''>
        <span className=" text-2xl font-bold pr-16">Enter your password</span>
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
              <ErrorMessage
                name="passwprd"
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
      {/* <div className="flex items-center justify-center mt-5 w-[270px]">
        <hr className="flex-grow border-t border-black" />
        <span className="text-black mx-2">or</span>
        <hr className="flex-grow border-t border-black" />
      </div>
      <div className="mt-5 w-full flex justify-center">
        <button
          type="button"
          className="bg-white w-72 text-black px-4 py-2 border border-black rounded-md font-bold flex items-center justify-center"
        >
          <img src={google_icon} alt="Google icon" className="mr-2 h-5 w-5" />
          Continue with Google
        </button>
      </div> */}
    </div>
  )
}

export default Password