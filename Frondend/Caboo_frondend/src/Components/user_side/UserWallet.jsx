import React, { useRef } from "react";
import useGetUser from "../../Hooks/useGetUser";
import { useSelector } from "react-redux";

const UserWallet = () => {
const {showRazorpay}=useGetUser()
  const amountref=useRef(null)
  const userdata = useSelector((state)=>state.user_data.user_data)
  const {wallet} = userdata[0]
  console.log(wallet,'user data')

  const handleSubmit = (e) => {
    e.preventDefault();
    const value={
        'amount' :amountref.current.value ||0,
        'user':userdata
    }
    showRazorpay(value)
    amountref.current.value=null
  };
  return (
    <div className="w-screen flex items-center justify-center mt-20">
      <div className="w-screen px-14 space-x-8">
        <div className="w-full">
          <div className=" flex bg-green-600 h-40  rounded-t-lg   w-full">
            <div className="flex flex-col justify-center items-center h-full w-1/4 space-y-2">
              <span className="text-4xl font-bold text-white">₹ {wallet}</span>
              <span className="text-2xl font-bold text-white">
                WALLET BALANCE
              </span>
            </div>
            <div className="w-3/4 flex flex-col  justify-center items-end  ">
              <div className=" space-y-4 mr-20">
              <span className="text-gray-300 font-bold text-xl">Recharge your wallet</span>

              <form onSubmit={handleSubmit} className="flex space-x-6">
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    ref={amountref}
                    className="px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    style={{ height: '44px' }} // Explicitly set height
                />
                <button
                    type="submit"
                    className="text-green-600 bg-white border border-green-600 text-lg font-bold py-2 px-4 rounded-lg shadow-[0px_0px_20px_rgba(0,0,0,0.2)] hover:scale-105 transition-all duration-300 delay-100 focus:ring-opacity-50"
                    style={{ height: '44px' }} // Explicitly set height to match input
                >
                    Add to Wallet
                </button>
                </form>

              </div>
            </div>
          </div>
        </div>

        <div className=""></div>
      </div>
    </div>
  );
};

export default UserWallet;
