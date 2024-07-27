import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import mainImage from "../../assets/mainimage.webp";
import { user_signup_url } from "../../Utils/Constanse"; 
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuthentication from "../../Hooks/useAuthentication";

const Signup_page = () => {
  const navigate = useNavigate();
  const {Signup_validation}=useAuthentication()

  const user = useSelector((state) => state.Authentication.email);
  const role = useSelector((state) => state.Authentication.role);


  const initialValues = {
    username: "",
    lastname: "",
    phone: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Full Name is required")
      .matches(
        /^[a-zA-Z][a-zA-Z\s]*$/,
        "Full Name must start with a letter and contain only letters and spaces"
      ),
    lastname: Yup.string()
      .required("Last Name is required")
      .matches(
        /^[a-zA-Z][a-zA-Z\s]*$/,
        "Last Name must start with a letter and contain only letters and spaces"
      ),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
      password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
  });

  const onSubmit = (values) => {
    values["email"] = user;
    values["role"] = role
    Signup_validation(values, user_signup_url);
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
              <span className="font-bold text-2xl flex items-center">
                Create an account
              </span>
              <div className="mt-6 w-96 max-w-md text-lg font-bold relative">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="relative mb-6">
                        <Field
                          type="text"
                          id="username"
                          name="username"
                          required
                          className="peer block w-full p-2 pt-6 pb-2 bg-gray-200 border-0 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 text-black"
                        />
                        <span className="absolute left-0 top-0 px-4 py-2 text-gray-700 transition-transform duration-300 transform peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-0.5rem] peer-focus:scale-75 origin-left pointer-events-none">
                          Full Name
                        </span>
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div className="relative mb-6">
                        <Field
                          type="text"
                          id="lastname"
                          name="lastname"
                          required
                          className="peer block w-full p-2 pt-6 pb-2 bg-gray-200 border-0 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 text-black"
                        />
                        <span className="absolute left-0 top-0 px-4 py-2 text-gray-700 transition-transform duration-300 transform peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-0.5rem] peer-focus:scale-75 origin-left pointer-events-none">
                          Last Name
                        </span>
                        <ErrorMessage
                          name="lastname"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div className="relative mb-6">
                        <Field
                          type="text"
                          id="phone"
                          name="phone"
                          required
                          className="peer block w-full p-2 pt-6 pb-2 bg-gray-200 border-0 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 text-black"
                        />
                        <span className="absolute left-0 top-0 px-4 py-2 text-gray-700 transition-transform duration-300 transform peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-0.5rem] peer-focus:scale-75 origin-left pointer-events-none">
                          Phone
                        </span>
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div className="relative mb-6">
                        <Field
                          type="password"
                          id="password"
                          name="password"
                          required
                          className="peer block w-full p-2 pt-6 pb-2 bg-gray-200 border-0 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 text-black"
                        />
                        <span className="absolute left-0 top-0 px-4 py-2 text-gray-700 transition-transform duration-300 transform peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-0.5rem] peer-focus:scale-75 origin-left pointer-events-none">
                          Password
                        </span>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div className="flex justify-center items-center">
                        <button
                          type="submit"
                          className="px-10 py-2 bg-white text-black font-bold rounded-md"
                        >
                          Continue
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
};

export default Signup_page;
