import React from "react";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

Modal.setAppElement("#root");

const validationSchema = Yup.object({
  username: Yup.string().required("Full Name is required")
  .matches(
    /^[a-zA-Z][a-zA-Z\s]*$/,
    "Full Name must start with a letter and contain only letters and spaces"
  ),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  address: Yup.string().required("Address is required")
  .matches(
    /^[a-zA-Z][a-zA-Z\s]*$/,
    "Address must start with a letter and contain only letters and spaces"
  ),
  phone: Yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits")
  .required("Phone number is required"),
});

const UserEdit = ({ isOpen, onClose, user, onSave }) => {
  const handleSubmit = (values, { setSubmitting }) => {
    onSave(values);
    setSubmitting(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
    >
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md mx-auto mt-16"> {/* Adjust mt-16 based on header height */}
        <h2 className="text-xl font-bold mb-4">Edit Basic Info</h2>
        <Formik
          initialValues={user}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Name</label>
                <Field
                  type="text"
                  name="username"
                  className="border p-2 w-full rounded"
                />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="border p-2 w-full rounded"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Address</label>
                <Field
                  type="text"
                  name="address"
                  className="border p-2 w-full rounded"
                />
                <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Phone</label>
                <Field
                  type="text"
                  name="phone"
                  className="border p-2 w-full rounded"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="border border-black text-black px-8 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-black text-white px-8 py-2 rounded"
                  disabled={isSubmitting}
                >
                  Update
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default UserEdit;
