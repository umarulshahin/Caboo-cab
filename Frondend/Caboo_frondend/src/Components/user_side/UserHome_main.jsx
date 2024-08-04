import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiFlag, FiMapPin } from "react-icons/fi";
import { FaLocationArrow, FaSpinner } from "react-icons/fa";
import { useLoadScript } from "@react-google-maps/api";
import MapComponent from "../../Pages/user_side/Map";

const libraries = ["places"];

const UserHome_main = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_google_map_api_key,
    libraries,
  });

  const autoCompleteRef1 = useRef(null);
  const inputRef1 = useRef(null);
  const autoCompleteRef2 = useRef(null);
  const inputRef2 = useRef(null);

  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false); // New state for loading

  const options = {
    componentRestrictions: { country: "in" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["address"],
  };

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
    setLocation(values.location);
    setDestination(values.destination);
  };

  const getCurrentLocation = (setFieldValue, field) => {
    if (navigator.geolocation) {
      setLoadingLocation(true); // Start loading
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const geocoder = new window.google.maps.Geocoder();
          const latlng = { lat: latitude, lng: longitude };

          geocoder.geocode({ location: latlng }, (results, status) => {
            setLoadingLocation(false); // Stop loading
            if (status === "OK") {
              if (results[0]) {
                console.log(results[0]);
                setFieldValue(field, results[0].formatted_address);
              } else {
                console.log("No results found");
              }
            } else {
              console.log("Geocoder failed due to: " + status);
            }
          });
        },
        (error) => {
          setLoadingLocation(false); // Stop loading
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };
  console.log(location,"home")
  console.log(destination)
  return (
    <div className="h-screen w-screen flex flex-col lg:flex-row justify-center items-center p-4">
      <div className="flex flex-col bg-white shadow-lg rounded-md w-full lg:w-1/3 p-6 mb-4 lg:mb-0 lg:mr-4">
        <span className="font-bold text-3xl text-blue-500 text-center mb-10">
          Request a ride, hop in, and <br />enjoy the journey.
        </span>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, setFieldValue }) => {
            useEffect(() => {
              if (isLoaded) {
                if (inputRef1.current) {
                  autoCompleteRef1.current = new window.google.maps.places.Autocomplete(
                    inputRef1.current,
                    options
                  );
                  autoCompleteRef1.current.addListener("place_changed", () => {
                    const place = autoCompleteRef1.current.getPlace();
                    console.log("Selected place:1", place);
                    setFieldValue("location", place.name);
                  });
                }
                if (inputRef2.current) {
                  autoCompleteRef2.current = new window.google.maps.places.Autocomplete(
                    inputRef2.current,
                    options
                  );
                  autoCompleteRef2.current.addListener("place_changed", () => {
                    const place = autoCompleteRef2.current.getPlace();
                    console.log("Selected place:2", place.name);
                    setFieldValue("destination", place.name);
                  });
                }
              }
            }, [isLoaded, setFieldValue]);

            return (
              <Form className="w-full">
                <div className="mb-4 relative">
                  <div className="relative">
                    <Field
                      name="location"
                      placeholder="Pickup location"
                      innerRef={inputRef1}
                      as="input"
                      className="block w-full p-2 border-b-2 border-gray-500 pl-10 pr-10 text-sm rounded-md"
                    />
                    <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                      <FiMapPin className="text-gray-400 w-5 h-5" />
                    </div>
                    <button
                      type="button"
                      onClick={() => getCurrentLocation(setFieldValue, "location")}
                      className="absolute inset-y-0 right-2 flex items-center"
                      title="Use current location"
                    >
                      {loadingLocation ? (
                        <FaSpinner className="text-gray-400 w-5 h-5 animate-spin" />
                      ) : (
                        <FaLocationArrow className="text-gray-400 w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="text-red-500 text-xs mt-1 ml-10"
                  />
                </div>

                <div className="mb-4 relative">
                  <div className="relative">
                    <Field
                      name="destination"
                      placeholder="Dropoff location"
                      innerRef={inputRef2}
                      as="input"
                      className="block w-full p-2 border-b-2 border-gray-500 pl-10 pr-10 text-sm rounded-md"
                    />
                    <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                      <FiFlag className="text-gray-400 w-5 h-5" />
                    </div>
                    <button
                      type="button"
                      onClick={() => getCurrentLocation(setFieldValue, "destination")}
                      className="absolute inset-y-0 right-2 flex items-center"
                      title="Use current location"
                    >
                      {loadingLocation ? (
                        <FaSpinner className="text-gray-400 w-5 h-5 animate-spin" />
                      ) : (
                        <FaLocationArrow className="text-gray-400 w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="destination"
                    component="div"
                    className="text-red-500 text-xs mt-1 ml-10"
                  />
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-black text-white font-bold rounded-md w-full"
                  >
                    {isSubmitting ? "Submitting..." : "See price"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFieldValue("location", "");
                      setFieldValue("destination", "");
                    }}
                    className="px-4 py-2 text-black border border-black font-bold rounded-md hover:bg-black hover:text-white w-full"
                  >
                    Clear
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="flex-grow h-[500px] w-full lg:w-2/3 bg-white rounded-md overflow-hidden">
        <MapComponent location={location} destination={destination} />
      </div>
    </div>
  );
};

export default UserHome_main;
