import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiFlag, FiMapPin } from "react-icons/fi";
import map from "../../assets/map.jpg";

const UserHome_main = () => {

  
  const initialValues = {
    location: "",
    destination: "",
  };

  const validationSchema = Yup.object({
    location: Yup.string().required("Location is required"),
    destination: Yup.string().required("Destination is required"),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Form data:", values);
    setSubmitting(false);
    resetForm();
  };

  return (
    <div className="container h-screen flex items-center justify-around my -10">
      <div className="flex flex-row w-full max-w-screen-lg">
        <div className=" max-w-fit h-[500px] bg-white shadow-2xl rounded-md">
          <div className="flex flex-row w-full max-w-screen-lg mx-auto">
            <div className="flex flex-col max-w-fit h-[500px] justify-center items-center bg-white shadow-2xl rounded-md">
              <div className="w-full ">
                <div className="flex flex-col items-center md:items-start justify-center text-black px-6 md:pl-16">
                  <div className="mt-10 w-full max-w-md" id="first_layout">
                    <span className="font-bold text-2xl text-center block md:text-left mb-6">
                      Request a ride, hop in, and enjoy the journey.
                    </span>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={onSubmit}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <div className="mb-4 relative w-full text-lg font-bold">
                            <Field
                              type="text"
                              id="location"
                              name="location"
                              placeholder="Enter your location"
                              className="mt-1 block w-full p-2 pl-14 border border-gray-500 rounded-md shadow-md"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FiMapPin className="text-gray-400" />
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
                              className="mt-1 block w-full p-2 pl-14 border border-gray-500 rounded-md shadow-md"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                            className="px-4 py-2 bg-black text-white font-bold rounded-md"
                          >
                            {isSubmitting ? "Submitting..." : "See price"}
                          </button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/4 h-[500px] mx-4 bg-white rounded-md overflow-hidden">
          <img className="w-full h-full object-cover" src={map} alt="map" />
        </div>
      </div>
    </div>
  );
};

export default UserHome_main;
