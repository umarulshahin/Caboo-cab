import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import mainImage from "../../assets/mainimage.webp";
import { useSelector } from "react-redux";
import useAuthentication from "../../Hooks/useAuthentication";
import { driver_signup_url } from "../../Utils/Constanse";

const Vehicle_doc_form = () => {
  const driver = useSelector((state) => state.driver_data.driver_data);
  const role = useSelector((state) => state.Authentication.role);
  const { DriverCreation } = useAuthentication();
  console.log(driver.phone);
  const initialValues = {
    aadhaar: "",
    vehicle_name: "",
    vehicle_no: "",
    phone: driver.phone || "",
    rc_img: null,
    license: null,
    insurance: null,
    vehicle_Photo: null,
    profile: null,
    Vehicle_type: "",
  };

  const validationSchema = Yup.object().shape({
    aadhaar: Yup.string()
      .matches(/^\d{12}$/, "Aadhaar number must be exactly 12 digits")
      .required("Required"),

    vehicle_name: Yup.string()
      .trim()
      .matches(/^[a-zA-Z0-9 ]+$/, "Vehicle name cannot contain symbols")
      .required("Required"),

    vehicle_no: Yup.string()
      .matches(
        /^[A-Za-z]{2}\d{2}[A-Za-z]{1,2}\d{1,4}$/,
        "Vehicle number must be in format ( KA03MN1234 )"
      )
      .matches(/^\S.*$/, "Vehicle number cannot start with a space")
      .required("Required"),

    phone: Yup.string()
      .trim()

      .matches(
        /^(?!.*(\d)\1{9})\d{10}$/,
        "Phone number must be 10 digits and cannot have all the same digits"
      )

      .required("Phone number is required"),

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

    Vehicle_type: Yup.string().required("Vehicle type is required"),
  });

  const onSubmit = (values) => {
    console.log(driver);
    const updatdriver= {...driver}
    if (values["phone"] && !driver.phone) {
      console.log(values["phone"], "yes its working");
      updatdriver.phone = values.phone;
    }
    values["role"] = role;
    values["customuser"] = updatdriver;
    console.log("Submitted values:", values);
    DriverCreation(values, driver_signup_url);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col mt-20">
      <div className="container mx-auto flex-grow flex flex-col md:flex-row">
        <div className="hidden h-screen md:flex md:w-1/2 items-center justify-center">
          <img className="h-[450px]" src={mainImage} alt="Main" />
        </div>
        <div className="w-full md:w-1/2 flex justify-center bg-black text-white p-6">
          <div className="flex-grow flex flex-col items-center md:items-start justify-center text-white">
            <span className="font-bold text-2xl flex items-center mb-6">
              Vehicle Documents
            </span>
            <div className="w-full max-w-2xl text-lg font-bold relative">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ setFieldValue, values }) => (
                  <Form className="space-y-6">
                    <div className="flex flex-wrap -mx-2">
                      <div className="w-full md:w-1/2 px-2 mb-4">
                        <Field
                          type="text"
                          id="aadhaar"
                          name="aadhaar"
                          placeholder="Aadhaar Number"
                          className="w-full p-2 bg-gray-200 rounded-md text-black"
                        />
                        <ErrorMessage
                          name="aadhaar"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-2 mb-4">
                        <Field
                          type="text"
                          id="vehicle_name"
                          name="vehicle_name"
                          placeholder="Vehicle Name"
                          className="w-full p-2 bg-gray-200 rounded-md text-black"
                        />
                        <ErrorMessage
                          name="vehicle_name"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-2">
                      <div className="w-full md:w-1/2 px-2 mb-4">
                        <Field
                          type="text"
                          id="vehicle_no"
                          name="vehicle_no"
                          placeholder="Vehicle Number"
                          className="w-full p-2 bg-gray-200 rounded-md text-black"
                        />
                        <ErrorMessage
                          name="vehicle_no"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-2 mb-4">
                        {!driver.phone && (
                        <>
                          <Field
                            type="number"
                            id="phone"
                            name="phone"
                            placeholder="Phone"
                            className="w-full p-2 bg-gray-200 rounded-md text-black"
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </>
                        )}
                      </div>
                    </div>

                    <div className="w-full mb-4">
                      <Field
                        as="select"
                        name="Vehicle_type"
                        className="w-full p-2 bg-gray-200 rounded-md text-black"
                      >
                        <option value="" disabled selected>
                          Vehicle Type
                        </option>
                        <option value="Car">Car</option>
                        <option value="Bike">Bike</option>
                        <option value="Auto">Auto</option>
                      </Field>
                      <ErrorMessage
                        name="Vehicle_type"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="w-full space-y-4">
                      {[
                        "rc_img",
                        "license",
                        "insurance",
                        "vehicle_Photo",
                        "profile",
                      ].map((field) => (
                        <div key={field} className="mb-4">
                          <label className="block text-sm font-medium text-gray-500 mb-2">
                            {field
                              .split("_")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </label>
                          <input
                            type="file"
                            name={field}
                            accept="image/*"
                            onChange={(event) => {
                              setFieldValue(
                                field,
                                event.currentTarget.files[0]
                              );
                            }}
                            className="w-full p-2 border border-gray-300 rounded-md text-white"
                          />
                          {values[field] && (
                            <img
                              src={URL.createObjectURL(values[field])}
                              alt={`${field} Preview`}
                              className="mt-2 h-32 object-fit rounded-lg"
                            />
                          )}
                          <ErrorMessage
                            name={field}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex justify-center">
                      <button
                        type="submit"
                        className="px-20 py-2 bg-white text-black rounded-md hover:bg-gray-700 hover:text-white"
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
