import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addDriver_data } from '../Redux/DriverSlice';
import WaitingModal from '../Components/Driver/WaitingModal';

const useDriver = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Drivercreation = async (values, url) => {
        try {
            const formData = new FormData();
        
            // Append fields to formData
            Object.keys(values).forEach(key => {
                if (values[key] instanceof File) {
                    formData.append(key, values[key]);
                } else if (typeof values[key] === 'object' && values[key] !== null) {
                    // Flatten the object if needed
                    Object.keys(values[key]).forEach(subKey => {
                        formData.append(`${key}[${subKey}]`, values[key][subKey]);
                    });
                } else {
                    formData.append(key, values[key]);
                }
            });
        
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
        
            if (response.status === 201) {
                console.log(response.data.success)
                if (response.data.success === "Driver successfully created") {

                        console.log(response.data);
                        toast.success("Congratulations! Your account has been successfully created")
                        navigate("/waitingModal")

                } else {
                    console.log(response.data.error)
                        // toast.warning(response.data.error && response.data.error.email ? "Email already exists" : "Phone number already exists");
                    
                }
            } else if (response.status === 400) {
                console.log(response.data, 'signup response');
                toast.error('There was an error with the request.');
            }
        
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Error submitting form. Please try again.');
        }
    };
    
    
    return { Drivercreation };
};

export default useDriver;
