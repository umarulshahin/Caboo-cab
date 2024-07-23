import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WaitingModal = () => {
    const navigate = useNavigate();

    const closeModal = () => {
        navigate('/');
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <div className="flex  items-center justify-center border-b pb-2">
                    <h3 className="text-xl font-semibold">Thaks For Registering</h3>
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={closeModal}
                    >
                        &times;
                    </button>
                </div>
                <div className="mt-4 flex justify-center text-xl font-medium">
                    <p>Our Authority will check your details and verify. After verification, you can login.</p>
                </div>
                <div className="mt-4 flex justify-center">
                    <button
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700"
                        onClick={closeModal}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WaitingModal;
