import { toast } from "sonner";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { addToken_data, addUser } from "../Redux/UserSlice";
import { useNavigate } from "react-router-dom";
import {Driver_data_urls, img_upload_url,user_data_url,} from "../Utils/Constanse";
import { addadmin_data } from "../Redux/AdminSlice";
import { addDriver_data, addDriver_token } from "../Redux/DriverSlice";
import apiClient from "../Axios/GetDataAxios";
import UserAxios from "../Axios/UserAxios";

const useGetUser = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Get_data = async (urls, value = null, role = null) => {

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

          dispatch(addadmin_data(response.data));
        } else if (role === 'driver') {

          console.log(response.data)

          dispatch(addDriver_data(response.data));
        } else {
          dispatch(addUser(response.data));
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
    }
  };

  
  const img_validate = async (file,id,role=null,email=null) => {

    if (file) {
     
      const formData = new FormData();
      formData.append("image", file);
      formData.append("id",id)
      try {
        const response = await UserAxios.patch(img_upload_url, formData, {
          meta: { role }, 
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          if (role&& role==='driver'){
            Get_data(Driver_data_urls, email, "driver");

          }else{
            Get_data(user_data_url, null);

          }
          toast.success("Image Update succesfully");
        }
      } catch (error) {
        console.log(error.response.data);
        if(error.response.data.detail=== 'Token is blacklisted'){
          if(role==='driver'){
  
            dispatch(addDriver_data(null))
            dispatch(addDriver_token(null))
            Cookies.remove('DriverTokens')
          }else{
  
          dispatch(addUser(null))
          dispatch(addToken_data(null))
          Cookies.remove('userTokens')
          }
          toast.warning("Your session has expired. Please log in again to continue.")
          navigate("/")
        }

        toast.warning(error);
      }
    }
  };

  const ProfilUpdate = async (values, urls,role=null,email=null) => {
    try {
    
      const response = await UserAxios.patch(urls, values, {
        meta: { role }, 

        headers: {

          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        if(role&&role==='driver'){
          console.log(role)    
          Get_data(Driver_data_urls, email, "driver");

        }else{
          Get_data(user_data_url, null);

        }
        toast.success("Profile update successfully");
      }
    } catch (error) {
      console.log(error, "profile Update");
      if(error.response.data.detail=== 'Token is blacklisted'){
        if(role==='driver'){

          dispatch(addDriver_data(null))
          dispatch(addDriver_token(null))
          Cookies.remove('DriverTokens')
        }else{

        dispatch(addUser(null))
        dispatch(addToken_data(null))
        Cookies.remove('userTokens')
        }
        toast.warning("Your session has expired. Please log in again to continue.")
        navigate("/")


              }
        toast.warning(error);

    }
  };

  return { img_validate, Get_data, ProfilUpdate };
};

export default useGetUser;
