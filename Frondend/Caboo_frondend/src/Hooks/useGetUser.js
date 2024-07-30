import { toast } from "sonner";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { addToken_data, addUser } from "../Redux/UserSlice";
import { useNavigate } from "react-router-dom";
import {img_upload_url,user_data_url,} from "../Utils/Constanse";
import { addadmin_data } from "../Redux/AdminSlice";
import { addDriver_data } from "../Redux/DriverSlice";
import apiClient from "../Axios/GetDataAxios";
import UserAxios from "../Axios/UserAxios";

const useGetUser = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Get_data = async (urls, value = null, role = null) => {

    console.log(role)
    try {
      const response = await apiClient.get(urls, {
        params: { id: value },
        meta: { role }, 

        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.status === 200) {
        console.log(response.data, "get user ");
        if (role === "admin") {
          console.log("admin side is working")

          dispatch(addadmin_data(response.data));
        } else if (role === 'driver') {
          console.log("driver side is working")

          console.log(response.data)

          dispatch(addDriver_data(response.data));
        } else {
          console.log("user side is working")
          dispatch(addUser(response.data));
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
    }
  };

  
  const img_validate = async (file,id) => {

    if (file) {
     
      const formData = new FormData();
      formData.append("image", file);
      formData.append("id",id)
      try {
        const response = await UserAxios.patch(img_upload_url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          Get_data(user_data_url, null);
          toast.success("Image Update succesfully");
        }
      } catch (error) {
        console.log(error.response.data);
        if(error.response.data.detail=== 'Token is blacklisted'){
          dispatch(addUser(null))
          dispatch(addToken_data(null))
          Cookies.remove('userTokens')
          navigate("/")
          toast.warning("Your session has expired. Please log in again to continue.")

                }

        toast.warning(error);
      }
    }
  };

  const ProfilUpdate = async (values, urls) => {
    try {
    
      const response = await UserAxios.patch(urls, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Profile update successfully");
        Get_data(user_data_url, null);
      }
    } catch (error) {
      console.log(error, "profile Update");
    }
  };

  return { img_validate, Get_data, ProfilUpdate };
};

export default useGetUser;
