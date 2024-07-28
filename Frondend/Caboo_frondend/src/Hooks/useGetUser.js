import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { addToken_data, addUser } from "../Redux/UserSlice";
import { useNavigate } from "react-router-dom";
import {img_upload_url,user_data_url,} from "../Utils/Constanse";
import { addadmin_data } from "../Redux/AdminSlice";
import { addDriver_data } from "../Redux/DriverSlice";

const useGetUser = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Get_data = async (urls, value = null, role = null) => {

    console.log(urls,"urls")
    console.log(role,"role")
    console.log(value,"values")

    try {
      let raw_token;
      let token={};
      if(role === "admin") {
        raw_token = Cookies.get("adminTokens");
     
      } else if (role === 'driver') {
        raw_token = Cookies.get("DriverTokens");
      
      }else{
        raw_token = Cookies.get("userTokens");

      }
      if(raw_token){

        token = JSON.parse(raw_token);
      }

      const response = await axios.get(urls,{
        params: { id: value },
        headers: {
          Authorization: `Bearer ${token.access}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log(response.data, "get user ");
        if (role === "admin") {
          dispatch(addadmin_data(response.data));

        } else if(role === 'driver') {

          dispatch(addDriver_data(response.data));

        }else{

          dispatch(addUser(response.data));

        }
      }
    } catch (error) {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);

    }
  };

  

  const img_validate = async (file) => {
    if (file) {
      const raw_token = Cookies.get("userTokens");
      const token = JSON.parse(raw_token);
      const formData = new FormData();
      formData.append("image", file);
      try {
        const response = await axios.patch(img_upload_url, formData, {
          headers: {
            Authorization: `Bearer ${token.access}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          console.log(response.data);
          Get_data(user_data_url, null);
          toast.success("Image Update succesfully");
        }
      } catch (error) {
        console.log(error);
        toast.warning(error);
      }
    }
  };

  const ProfilUpdate = async (values, urls) => {
    try {
      const raw_token = Cookies.get("userTokens");
      const token = JSON.parse(raw_token);
      // const formdata= new FormData();
      // formdata.append("value",values)
      const response = await axios.post(urls, values, {
        headers: {
          Authorization: `Bearer ${token.access}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log(response.data);
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
