import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import mainImage from "../../assets/mainimage.webp";
import { user_signup_url} from "../../Utils/Constanse";
import useFormsubmition from "../../Hooks/useFormsubmition"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Signup_page = () => {
  const { FormSubmition } = useFormsubmition();
  const Navigate=useNavigate()
  const role=useSelector((state)=>state.Authentication.email)

  const initialValues = {
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    con_password:"",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Full Name is required")
      .matches(
        /^[a-zA-Z][a-zA-Z\s]*$/,
        "Full Name must start with a letter and contain only letters and spaces"
      ),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    address: Yup.string()
      .required("Address is required")
      .matches(
        /^[a-zA-Z][a-zA-Z\s]*$/,
        "Address must start with a letter and contain only letters and spaces"
      ),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        
      ),
      con_password: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref('password'), null], "Passwords must match")
      
    // profile: Yup.mixed()
    //   .test("fileType", "Unsupported file format", (value) => {
    //     if (!value) return true; // Allow empty value if not required
    //     return ["image/jpeg", "image/png"].includes(value.type);
    //   })
    //   .required("Profile image is required"),
  });

  const onSubmit = (values) => {
    
        values['role']=role.role

    FormSubmition(values,user_signup_url);

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
              <div className="mt-6 w-96 max-w-md text-lg font-bold relative ">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({ isSubmitting, setFieldValue }) => (
                    <Form>
                      <div className="mb-4" >
                        <Field
                          type="text"
                          id="username"
                          name="username"
                          placeholder="Full Name"
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-md text-black"
                        />
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div className="mb-4">
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

                      <div className="mb-4">
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

                      <div className="mb-4">
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

                      <div className="mb-4">
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
                      <div className="mb-4">
                        <Field
                          type="password"
                          id="con_password"
                          name="con_password"
                          placeholder="Confirm Password"
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-md text-black"
                        />
                        <ErrorMessage
                          name="con_password"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      {/* <div className="mb-4 relative w-full text-lg font-bold">
                        <input
                          type="file"
                          id="profile"
                          name="profile"
                          onChange={(event) => {
                            setFieldValue("profile", event.currentTarget.files[0]);
                          }}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-md text-white"
                        />
                        <ErrorMessage
                          name="profile"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div> */}

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
