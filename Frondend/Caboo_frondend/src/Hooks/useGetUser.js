import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { addToken_data, addUser } from "../Redux/UserSlice";
import { useNavigate } from "react-router-dom";
import {
  img_upload_url,
  user_data_url,
  admin_data_url,
} from "../Utils/Constanse";

import { addadmin_data, addadmin_token } from "../Redux/AdminSlice";

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
      if (role === "Admin") {
        raw_token = Cookies.get("adminTokens");
     
      } else {
        raw_token = Cookies.get("userTokens");
      
      }
      if(raw_token){

        token = JSON.parse(raw_token);
        console.log(token.access);
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
        } else {
          dispatch(addUser(response.data));
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);

    }
  };

  const signin = async (data, urls, seterrormessage = null, role = null) => {
    try {
      const response = await axios.post(urls, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        if (role === "admin") {
          const token = JSON.stringify(response.data);
          Cookies.set("adminTokens", token, { expires: 7 });
          const value = jwtDecode(response.data.access);
          dispatch(addadmin_token(value));
          Get_data(admin_data_url,value.user_id,role);
          toast.success("Login successfully");
          navigate("/admin_home");
        } else {
          console.log(response.data);

          const token = JSON.stringify(response.data);
          Cookies.set("userTokens", token, { expires: 7 });
          const value = jwtDecode(response.data.access);
          dispatch(addToken_data(value));
          Get_data(user_data_url, null);
          toast.success("Login successfully");
          navigate("/userhome");
        }
      }
    } catch (error) {
      console.log(error, "Signin");
      if (
        error.response.data.detail ===
        "No active account found with the given credentials"
      ) {
        toast.warning("Your email and password do not match. Please try again");
      }
      console.log(error, "Signin");
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

  return { img_validate, signin, Get_data, ProfilUpdate };
};

export default useGetUser;
