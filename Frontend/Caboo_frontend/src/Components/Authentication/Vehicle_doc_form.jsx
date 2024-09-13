import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import mainImage from "../../assets/mainimage.webp";
import { useSelector } from "react-redux";
import useAuthentication from "../../Hooks/useAuthentication";
import { driver_signup_url } from "../../Utils/Constanse";

const initialValues = {
    aadhaar: "",
    vehicle_name: "",
    vehicle_no: "",
    rc_img: null,
    license: null,
    insurance: null,
    vehicle_Photo: null,
    profile: null,
};

const validationSchema = Yup.object().shape({
    aadhaar: Yup.string()
        .matches(/^\d{12}$/, "Aadhaar number must be exactly 12 digits")
        .required("Required"),

    vehicle_name: Yup.string()
        .matches(/^[a-zA-Z0-9 ]+$/, "Vehicle name cannot contain symbols")
        .matches(/^\S.*$/, "Vehicle name cannot start with a space")
        .required("Required"),

    vehicle_no: Yup.string()
        .matches(/^[a-zA-Z0-9 ]+$/, "Vehicle number cannot contain symbols")
        .matches(/^\S.*$/, "Vehicle number cannot start with a space")
        .required("Required"),

    rc_img: Yup.mixed()
        .test("fileType", "Unsupported file format", (value) => {
            if (!value) return true; // Allow empty value if not required
            return ["image/jpeg", "image/png"].includes(value.type);
        })
        .required("RC Document is required"),

    license: Yup.mixed()
        .test("fileType", "Unsupported file format", (value) => {
            if (!value) return true; // Allow empty value if not required
            return ["image/jpeg", "image/png"].includes(value.type);
        })
        .required("License is required"),

    insurance: Yup.mixed()
        .test("fileType", "Unsupported file format", (value) => {
            if (!value) return true; // Allow empty value if not required
            return ["image/jpeg", "image/png"].includes(value.type);
        })
        .required("Insurance is required"),

    vehicle_Photo: Yup.mixed()
        .test("fileType", "Unsupported file format", (value) => {
            if (!value) return true; // Allow empty value if not required
            return ["image/jpeg", "image/png"].includes(value.type);
        })
        .required("Vehicle Photo is required"),

    profile: Yup.mixed()
        .test("fileType", "Unsupported file format", (value) => {
            if (!value) return true; // Allow empty value if not required
            return ["image/jpeg", "image/png"].includes(value.type);
        })
        .required("Profile Photo is required"),
});
const Vehicle_doc_form = () => {
    const driver = useSelector((state) => state.driver_data.driver_data);
    const role = useSelector((state) => state.Authentication.role);
    const { DriverCreation } = useAuthentication();
    
    const onSubmit = (values) => {
        console.log(driver)

        values['role'] = role;
        values['customuser'] = driver;
        console.log("Submitted values:", values);
        DriverCreation(values, driver_signup_url);
    };

    return (
        <div className="bg-black min-h-screen flex flex-col mt-20">
            <div className="container mx-auto flex-grow flex flex-col md:flex-row">
                <div className="hidden md:flex md:w-3/6 items-center justify-center">
                    <img className="h-[450px]" src={mainImage} alt="Main" />
                </div>
                <div className="w-full md:w-3/6 flex justify-center bg-black text-white p-6">
                    <div className="flex-grow flex flex-col items-center md:items-start justify-center text-white">
                        <span className="font-bold text-2xl flex items-center">
                            Vehicle Documents
                        </span>
                        <div className="mt-6 w-full max-w-md text-lg font-bold relative">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            >
                                {({ setFieldValue, values }) => (
                                    <Form>
                                        {/* Aadhaar Number */}
                                        <div className="relative mb-6">
                                <Field
                                    type="text"
                                    id="aadhaar"
                                    name="aadhaar"
                                    required
                                    className="peer block w-full p-2 pt-6 pb-2 bg-gray-200 border-0 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 text-black"
                                />
                                <span className="absolute left-0 top-0 px-4 py-2 text-gray-700 transition-transform duration-300 transform peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-0.5rem] peer-focus:scale-75 origin-left pointer-events-none">
                                    Aadhaar Number
                                </span>
                                <ErrorMessage
                                    name="aadhaar"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            <div className="relative mb-6">
                                <Field
                                    type="text"
                                    id="vehicle_name"
                                    name="vehicle_name"
                                    required
                                    className="peer block w-full p-2 pt-6 pb-2 bg-gray-200 border-0 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 text-black"
                                />
                                <span className="absolute left-0 top-0 px-4 py-2 text-gray-700 transition-transform duration-300 transform peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-0.5rem] peer-focus:scale-75 origin-left pointer-events-none">
                                    Vehicle Name
                                </span>
                                <ErrorMessage
                                    name="vehicle_name"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            <div className="relative mb-6">
                                <Field
                                    type="text"
                                    id="vehicle_no"
                                    name="vehicle_no"
                                    required
                                    className="peer block w-full p-2 pt-6 pb-2 bg-gray-200 border-0 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 text-black"
                                />
                                <span className="absolute left-0 top-0 px-4 py-2 text-gray-700 transition-transform duration-300 transform peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-0.5rem] peer-focus:scale-75 origin-left pointer-events-none">
                                    Vehicle Number
                                </span>
                                <ErrorMessage
                                    name="vehicle_no"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>


                                        {/* RC Document */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-500">
                                                RC Document
                                            </label>
                                            <input
                                                type="file"
                                                name="rc_img"
                                                accept="image/*"
                                                onChange={(event) => {
                                                    setFieldValue("rc_img", event.currentTarget.files[0]);
                                                }}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-md text-white"
                                            />
                                            {values.rc_img && (
                                                <img
                                                    src={URL.createObjectURL(values.rc_img)}
                                                    alt="RC Document Preview"
                                                    className="mt-2 w-32 h-32 object-cover"
                                                />
                                            )}
                                            <ErrorMessage
                                                name="rc_img"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        {/* License */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-500">
                                                License
                                            </label>
                                            <input
                                                type="file"
                                                name="license"
                                                accept="image/*"
                                                onChange={(event) => {
                                                    setFieldValue("license", event.currentTarget.files[0]);
                                                }}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-md text-white"
                                            />
                                            {values.license && (
                                                <img
                                                    src={URL.createObjectURL(values.license)}
                                                    alt="License Preview"
                                                    className="mt-2 w-32 h-32 object-cover"
                                                />
                                            )}
                                            <ErrorMessage
                                                name="license"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        {/* Insurance */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-500">
                                                Insurance
                                            </label>
                                            <input
                                                type="file"
                                                name="insurance"
                                                accept="image/*"
                                                onChange={(event) => {
                                                    setFieldValue("insurance", event.currentTarget.files[0]);
                                                }}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-md text-white"
                                            />
                                            {values.insurance && (
                                                <img
                                                    src={URL.createObjectURL(values.insurance)}
                                                    alt="Insurance Preview"
                                                    className="mt-2 w-32 h-32 object-cover"
                                                />
                                            )}
                                            <ErrorMessage
                                                name="insurance"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        {/* Vehicle Photo */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-500">
                                                Vehicle Photo
                                            </label>
                                            <input
                                                type="file"
                                                name="vehicle_Photo"
                                                accept="image/*"
                                                onChange={(event) => {
                                                    setFieldValue("vehicle_Photo", event.currentTarget.files[0]);
                                                }}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-md text-white"
                                            />
                                            {values.vehicle_Photo && (
                                                <img
                                                    src={URL.createObjectURL(values.vehicle_Photo)}
                                                    alt="Vehicle Photo Preview"
                                                    className="mt-2 w-32 h-32 object-cover"
                                                />
                                            )}
                                            <ErrorMessage
                                                name="vehicle_Photo"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        {/* Profile Photo */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-500">
                                                Profile Photo
                                            </label>
                                            <input
                                                type="file"
                                                name="profile"
                                                accept="image/*"
                                                onChange={(event) => {
                                                    setFieldValue("profile", event.currentTarget.files[0]);
                                                }}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-md text-white"
                                            />
                                            {values.profile && (
                                                <img
                                                    src={URL.createObjectURL(values.profile)}
                                                    alt="Profile Photo Preview"
                                                    className="mt-2 w-32 h-32 object-cover"
                                                />
                                            )}
                                            <ErrorMessage
                                                name="profile"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        <div className="mt-6 flex justify-center">
                                            <button
                                                type="submit"
                                                className="px-20 py-2 bg-white text-black rounded-md"
                                            >
                                                Submit
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
    );
};

export default Vehicle_doc_form;

