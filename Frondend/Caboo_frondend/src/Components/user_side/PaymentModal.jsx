import React from 'react';
import razorpay from '../../assets/razorpay.png'
import wallet from '../../assets/wallet.png'
import cashinhand from '../../assets/cashinhand.png'


const PaymentModal = () => {
  return (
    <div className="modal fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 ">
        {/* Modal Header */}

        {/* Modal Body */}
        <div className="mb-4 flex flex-col justify-center items-center space-y-4">
          <span className="text-3xl font-bold">Your destination has been reached!</span>
          <p className="text-xl font-bold">
            Thank you for choosing C<span className="text-yellow-500">a</span>boo.
          </p>
          <p className="text-gray-700 text-center">
            Now please pay the fare charge to the driver by choosing any of the
            <br />
            <span className="block text-center">payment options available below:</span>
          </p>
          <div className="text-lg font-semibold mb-2">Fare charge</div>
          <div className="text-xl font-bold text-gray-800">₹157</div>
        </div>

       

        {/* Separator */}
        <div className="separator my-4 flex items-center">
          <hr className="line flex-1 border-gray-300" />
          <p className="mx-4 text-gray-700"> pay using</p>
          <hr className="line flex-1 border-gray-300" />
        </div>

        {/* Payment Options */}
        <div className="payment--options flex flex-col space-y-4">
          <button
            type="button"
            className="payment-option flex items-center p-2 border border-gray-300 rounded-lg w-full bg-gray-100 hover:bg-gray-200"
          >
            <img src={razorpay} alt="Razorpay" className="w-10 mr-3" />
            <span className="text-gray-700">Razorpay</span>
          </button>
          <button
            type="button"
            className="payment-option flex items-center p-2 border border-gray-300 rounded-lg w-full bg-gray-100 hover:bg-gray-200"
          >
            <img src={wallet} alt="E-Wallet" className="w-8 h-8 mr-5" />
            <span className="text-gray-700">E-Wallet</span>
          </button>
          <button
            type="button"
            className="payment-option flex items-center p-2 border border-gray-300 rounded-lg w-full bg-gray-100 hover:bg-gray-200"
          >
            <img src={cashinhand} alt="Cash" className="w-8 h-8 mr-5" />
            <span className="text-gray-700">Cash</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default PaymentModal;
