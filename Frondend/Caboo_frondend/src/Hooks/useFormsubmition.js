
import React from 'react'
import axios from 'axios';


const useFormsubmition = () => {
  

    const FormSubmition = async(props)=>{

        try{
         const response= await axios.post(urls,props,{
            headers:{
                'Content-Type' : 'application/json'

            }
         })


        }catch(error){

        }
    
            
    }

  return {FormSubmition}
}

export default useFormsubmition