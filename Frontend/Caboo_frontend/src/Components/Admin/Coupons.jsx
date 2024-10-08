import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Coupons = () => {
  const formik = useFormik({
    initialValues: {
      couponCode: "",
      couponType: "",
      discount: "",
      maxAmount: "",
      image: null,
      startDate: "",
      expireDate: "",
      isActive: false,
    },
    validationSchema: Yup.object({
      couponCode: Yup.string().required("Coupon code is required"),
      couponType: Yup.string().required("Coupon type is required"),
      discount: Yup.number()
        .typeError("Discount must be a number")
        .required("Discount amount/percentage is required"),
      maxAmount: Yup.number()
        .typeError("Max amount must be a number")
        .required("Maximum amount is required"),
      image: Yup.mixed().required("Image is required"),
      startDate: Yup.date().required("Start date is required"),
      expireDate: Yup.date().required("Expiry date is required"),
    }),
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log("Form values:", values);
    },
  });

  return (
    <div className="p-10">
      <h1 className="text-3xl text-black font-bold mb-5">Coupons Management</h1>
      <form onSubmit={formik.handleSubmit}>
        {/* First Line: Coupon Code and Coupon Type */}
        <div className="flex justify-evenly pt-10 w-full space-x-10">
          <div className="flex flex-col w-1/2">
            <label htmlFor="couponCode" className="font-semibold">
              Coupon Code <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="couponCode"
              name="couponCode"
              className="bg-gray-200 py-2 px-6 my-2 border border-gray-400"
              value={formik.values.couponCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.couponCode && formik.errors.couponCode ? (
              <p className="text-red-600">{formik.errors.couponCode}</p>
            ) : null}
          </div>

          <div className="flex flex-col w-1/2">
            <label htmlFor="couponType" className="font-semibold">
              Coupon Type <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="couponType"
              name="couponType"
              className="bg-gray-200 py-2 px-6 my-2 border border-gray-400"
              value={formik.values.couponType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.couponType && formik.errors.couponType ? (
              <p className="text-red-600">{formik.errors.couponType}</p>
            ) : null}
          </div>
        </div>

        {/* Second Line: Discount, Max Amount, and Image */}
        <div className="flex justify-evenly pt-10 w-full space-x-10">
          <div className="flex flex-col w-1/3">
            <label htmlFor="discount" className="font-semibold">
              Discount Amount/Percentage <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="discount"
              name="discount"
              className="bg-gray-200 py-2 px-6 my-2 border border-gray-400"
              value={formik.values.discount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.discount && formik.errors.discount ? (
              <p className="text-red-600">{formik.errors.discount}</p>
            ) : null}
          </div>

          <div className="flex flex-col w-1/3">
            <label htmlFor="maxAmount" className="font-semibold">
              Maximum Amount <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="maxAmount"
              name="maxAmount"
              className="bg-gray-200 py-2 px-6 my-2 border border-gray-400"
              value={formik.values.maxAmount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.maxAmount && formik.errors.maxAmount ? (
              <p className="text-red-600">{formik.errors.maxAmount}</p>
            ) : null}
          </div>

          <div className="flex flex-col w-1/3">
            <label htmlFor="image" className="font-semibold">
              Image <span className="text-red-600">*</span>
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="bg-gray-200 py-2 px-6 my-2 border border-gray-400"
              onChange={(event) => {
                formik.setFieldValue("image", event.currentTarget.files[0]);
              }}
              onBlur={formik.handleBlur}
            />
            {formik.touched.image && formik.errors.image ? (
              <p className="text-red-600">{formik.errors.image}</p>
            ) : null}
          </div>
        </div>

        {/* Third Line: Start Date, Expiry Date, and Toggle */}
        <div className="flex justify-evenly pt-10 w-full space-x-10">
          <div className="flex flex-col w-1/3">
            <label htmlFor="startDate" className="font-semibold">
              Start Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="bg-gray-200 py-2 px-6 my-2 border border-gray-400"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.startDate && formik.errors.startDate ? (
              <p className="text-red-600">{formik.errors.startDate}</p>
            ) : null}
          </div>

          <div className="flex flex-col w-1/3">
            <label htmlFor="expireDate" className="font-semibold">
              Expiry Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              id="expireDate"
              name="expireDate"
              className="bg-gray-200 py-2 px-6 my-2 border border-gray-400"
              value={formik.values.expireDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.expireDate && formik.errors.expireDate ? (
              <p className="text-red-600">{formik.errors.expireDate}</p>
            ) : null}
          </div>

          <div className="flex flex-col w-1/3">
            <label htmlFor="isActive" className="font-semibold">
              Activate Coupon
            </label>
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              className="my-2 h-6 w-6"
              checked={formik.values.isActive}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center pt-10">
          <button
            type="submit"
            className="bg-black text-white py-2 px-10 rounded-full font-bold hover:bg-gray-800"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Coupons;
