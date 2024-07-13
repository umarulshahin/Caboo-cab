import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import mainImage from "../assets/mainimage.webp";
import useFormsubmition from "../Hooks/useFormsubmition";
import {user_signup} from "../Utils/Constanse"

const Signup_page = () => {

    const {FormSubmition}=useFormsubmition()
    const initialValues = {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        profileImage: null,
      };
      
      const validationSchema = Yup.object().shape({
        fullName: Yup.string()
          .required('Full Name is required')
          .matches(/^[a-zA-Z][a-zA-Z\s]*$/, 'Full Name must start with a letter and contain only letters and spaces'),
        email: Yup.string()
          .email('Invalid email format')
          .required('Email is required'),
        phone: Yup.string()
          .matches(/^\d{10}$/, 'Phone number must be 10 digits')
          .required('Phone number is required'),
        address: Yup.string()
          .required('Address is required')
          .matches(/^[a-zA-Z][a-zA-Z\s]*$/, 'Address must start with a letter and contain only letters and spaces'),
        password: Yup.string()
          .required('Password is required')
          .min(8, 'Password must be at least 8 characters')
          .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
          ),
        profileImage: Yup.mixed().test('fileType', 'Unsupported file format', (value) => {
          if (!value) return true; // Allow empty value if not required
          return ['image/jpeg', 'image/png'].includes(value.type);
        }).required('Profile image is required'),
      });
      
      const onSubmit = (values) => {
        console.log(user_signup)
        FormSubmition(values,user_signup)
      };
    
      return (
        <div className="bg-black min-h-screen">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row">
          <div className="hidden md:flex md:w-3/6 items-center justify-center">
              <img className="h-[450px]" src={mainImage} alt="Main" />
            </div>
            <div className="w-full md:w-3/6 flex justify-center bg-black h-screen text-white">
      <div className="h-screen flex flex-col items-center md:items-start justify-center text-white px-6 md:pl-16">
        <span className="font-bold text-2xl flex items-center">Create an account</span>
        <div className="mt-10 w-full max-w-md">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className="mb-4 relative w-full text-lg font-bold">
                  <Field
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Full Name"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-md text-black"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4 relative w-full text-lg font-bold">
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-md text-black"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4 relative w-full text-lg font-bold">
                  <Field
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-md text-black"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4 relative w-full text-lg font-bold">
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Address"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-md text-black"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4 relative w-full text-lg font-bold">
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-md text-black"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4 relative w-full text-lg font-bold">
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    onChange={(event) => {
                      setFieldValue('profileImage', event.currentTarget.files[0]);
                    }}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-md text-black"
                  />
                  <ErrorMessage
                    name="profileImage"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="flex justify-center items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-white text-black font-bold rounded-md"
                  >
                    {isSubmitting ? "Submitting..." : "Create Account"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
            
          </div>
        </div>
      </div>
      
      );
}

export default Signup_page