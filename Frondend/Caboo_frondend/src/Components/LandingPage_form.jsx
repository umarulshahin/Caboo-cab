import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiFlag, FiMapPin } from "react-icons/fi";
import mainImage from "../assets/mainimage.webp";


const Landing_Form = () => {
  // Define the initial values of the form
  const initialValues = {
    location: "",
    destination: "",
  };

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Location is required"),
    email: Yup.string().required("Destination is required"),
  });

  // Define the onSubmit function
  const onSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Form data:", values);
    setSubmitting(false);
    resetForm();
  };

  return (
    <div className="container mx-auto   ">
      <div className=" flex">
        <div className=" w-3/6 flex justify-center">
          <div className=" h-screen flex flex-col items-start justify-center text-white pl-16">
            <span className="text-2xl font-bold">
              Always Ready To Assist, Anytime{" "}
            </span>
            <span className="text-2xl font-bold mt-2">
              Anywhere With C<span className="text-yellow-500">a</span>boo
            </span>
            <div className="mt-10">
              <span className="font-bold">Request a ride, hop in, and go.</span>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className=" mb-4 relative w-full text-lg font-bold">
                      <Field
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Enter your location"
                        className="mt-1 block w p-2 border pl-14  border-gray-300 rounded-md shadow-md"
                      />

                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <FiMapPin className="text-gray-400 " />
                      </div>

                      <ErrorMessage
                        name="location"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="mb-4 relative text-lg font-bold">
                      <Field
                        type="text"
                        id="destination"
                        name="destination"
                        placeholder="Enter your destination"
                        className="mt-1 block p-2 pl-14 border border-gray-300 rounded-md shadow-sm"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <FiFlag className="text-gray-400" />
                      </div>
                      <ErrorMessage
                        name="destination"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-white text-black font-bold rounded-md"
                    >
                      {isSubmitting ? "Submitting..." : "See price"}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
        <div className="w-3/6 flex items-center justify-start">
          <img className="h-[450px]" src={mainImage} alt="Login image" />
        </div>
      </div>
    </div>
  );
};

export default Landing_Form;
