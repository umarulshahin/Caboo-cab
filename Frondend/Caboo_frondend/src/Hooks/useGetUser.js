import axios from "axios";
import React from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { addToken_data, addUser } from "../Redux/UserSlice";
import { useNavigate } from "react-router-dom";
import { img_upload_url } from "../Utils/Constanse";
import { user_data_url } from "../Utils/Constanse";

const useGetUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Get_data = async (urls) => {
    try {
      const raw_token = Cookies.get("userTokens");
      const token = JSON.parse(raw_token);
      const response = await axios.get(urls, {
        headers: {
          Authorization: `Bearer ${token.access}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log(response.data, "get user ");

        dispatch(addUser(response.data));
      }
    } catch (error) {
      console.log(error, "get_data");
    }
  };

  const signin = async (data, urls, seterrormessage = null) => {
    try {
      const response = await axios.post(urls, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Login successfully");
        const token = JSON.stringify(response.data);
        Cookies.set("userTokens", token, { expires: 7 });
        const value = jwtDecode(response.data.access);
        dispatch(addToken_data(value));
        Get_data(user_data_url);
        navigate("/userhome");
      }
    } catch (error) {
      if (
        error.response.data.detail ===
        "No active account found with the given credentials"
      ) {
        seterrormessage(
          "Your email and password do not match. Please try again"
        );
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
          Get_data(user_data_url);
          toast.success("Image Update succesfully");
        }
      } catch (error) {
        console.log(error);
        toast.warning(error);
      }
    }
  };

  const ProfilUpdate=async(values,urls)=>{

    try{
       
        const raw_token=Cookies.get("userTokens")
        const token=JSON.parse(raw_token)
        // const formdata= new FormData();
        // formdata.append("value",values)
        const response= await axios.post(urls,values,{
            headers:{
                Authorization: `Bearer ${token.access}`,
                "Content-Type": "multipart/form-data" 

            }
        });

        if(response.status===200){

            console.log(response.data)
            toast.success("Profile update successfully")
            Get_data(user_data_url)
        }

    }catch(error){
        console.log(error,"profile Update")
    }
  }

  return { img_validate, signin, Get_data,ProfilUpdate };
};

export default useGetUser;
