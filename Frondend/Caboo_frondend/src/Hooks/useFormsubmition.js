
import React from 'react'
import axios from 'axios';


const useFormsubmition = () => {
  

    const FormSubmition = async(value,urls)=>{
    
        try{
         const response= await axios.post(urls,{'signup_data':value},{

            headers:{
                'Content-Type' : 'application/json'

            }
         })
         if (response.status===200){
            
            console.log(response.data,'signup response')

         }


        }catch(error){

        }
    
            
    }

  return {FormSubmition}
}

export default useFormsubmition