import React, { useState } from 'react';
import razorpay from '../../assets/razorpay.png'
import iconwallet from '../../assets/wallet.png'
import cashinhand from '../../assets/cashinhand.png'
import { useSelector } from 'react-redux';
import useUserWebSocket from '../../Socket/Socket';
import useGetUser from '../../Hooks/useGetUser';
import useOnlinePayment from '../../Hooks/useOnlinePayment';

const PaymentModal = () => {

    const ridedriver = useSelector((state) => state.ride_data.rideDriverdetails);
    const userdata = useSelector((state)=>state.user_data.user_data)
    const { amount } = ridedriver ? ridedriver.data.tripdata.trip_data : {};
    const {wallet} = userdata[0]
    const [waiting ,setWaiting] = useState(false)
    const {sendMessage}=useUserWebSocket()
    const {showRazorpay}=useGetUser()
    const [error,seterror] =useState('')   

    const { showOnline }=useOnlinePayment()
    const handlePayment=(e)=>{
        const payment_type = e.target.value
        let data={}
        if(payment_type === 'cashinhand'){
            console.log('payment is cash in hand')
            data = {
                'payment_type' : payment_type,

            }
            sendMessage(data)
            setWaiting(true)

        }else if (payment_type === 'wallet'){
            console.log('payment is wallet')

            if (parseInt(wallet)>=parseInt(amount)){
              console.log(wallet,'wallet amount')
              data ={
                'payment_type' : payment_type,
                'amount':amount
              }
              sendMessage(data)
              setWaiting(true)
            }else{
               seterror("You do not have enough balance in your wallet.")
            }
        }else if (payment_type === 'razorpay'){
            console.log('payment is razorpay ')
            const data={
              'payment_type' : payment_type,
              user:userdata,
              amount:amount,
            }

            showOnline(data)
            
        }

    }

  return (
    <div className="modal fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      { !waiting ?
        <div className="bg-white rounded-lg shadow-lg p-6 ">
       
        <div className="mb-4 flex flex-col justify-center items-center space-y-4">
          <span className="text-3xl font-bold">Your destination has been reached!</span>
          <p className="text-xl font-bold">
            Thank you for choosing C<span className="text-yellow-500">a</span>boo cab.
          </p>
          <p className="text-gray-700 text-center">
            Now please pay the fare charge to the driver by choosing any of the
            <br />
            <span className="block text-center">payment options available below:</span>
          </p>
          <div className="text-lg font-semibold mb-2">Fare charge</div>
          <div className="text-3xl font-bold text-green-600">₹ {amount}</div>
        </div>

        <div className="separator my-4 flex items-center">
          <hr className="line flex-1 border-gray-300" />
          <p className="mx-4 text-gray-700"> pay using</p>
          <hr className="line flex-1 border-gray-300" />
        </div>

        <div className="payment--options flex flex-col space-y-4">
          <button
            type="button"
            value='razorpay'
            name='razorpay'
            onClick={handlePayment}
            className="payment-option flex items-center p-2 border border-gray-300 rounded-lg w-full bg-gray-100 hover:bg-gray-200"
          >
            <img src={razorpay} alt="Razorpay" className="w-14 mr-3" />
            <span className="text-gray-700">Razorpay</span>
          </button>
          <button
            type="button"
            value='wallet'
            name='wallet'
            onClick={handlePayment}
            className="payment-option flex items-center p-2 border border-gray-300 rounded-lg w-full bg-gray-100 hover:bg-gray-200"
          >
            <img src={iconwallet} alt="Wallet" className="text-sm w-8 h-8 mr-9" />
            <span className="text-gray-700">E-Wallet</span>
          </button>
          {error && <span className='text-sm text-center text-red-600'>{error}</span>}

          <button
            type="button"
            name='cashinhand'
            value='cashinhand'
            onClick={handlePayment}
            className="payment-option flex items-center p-2 border border-gray-300 rounded-lg w-full bg-gray-100 hover:bg-gray-200"
          >
            <img src={cashinhand} alt="Cash" className="w-8 h-8 mr-9" />
            <span className="text-gray-700">Cash</span>
          </button>
        </div>

      </div> :
        <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4 flex flex-col justify-center items-center space-y-4">
            <span className="text-3xl font-bold text-center">Your Cash Payment is Being Processed</span>
            <p className="text-xl font-bold text-center">
                Thank you for choosing C<span className="text-yellow-500">a</span>boo cab.
            </p>
            <p className="text-gray-700 text-center">
                You have chosen to pay the fare in cash. We are notifying the driver about your payment. Please wait for the driver's confirmation.
                <br />
                <span className="block text-center">You'll be notified as soon as the driver confirms the payment.</span>
            </p>
            <div className="loader border-r-2 rounded-full border-yellow-500 bg-yellow-300 animate-bounce
               aspect-square w-8 flex justify-center items-center text-yellow-700">$</div>
            <div className="text-lg font-semibold mb-2 text-center">Total Fare</div>
            
            <div className="text-3xl font-bold text-green-600 text-center">₹ {amount}</div>
        </div>
    </div>
    
      }
    </div>
  );
};

export default PaymentModal;
