import { useEffect } from "react"
import useAdmin from "../../Hooks/useAdmin"
import Sidebar_admin from "./Sidebar_admin"
import { get_Driver_url, get_Users_url } from "../../Utils/Constanse"




const Admin_home_page = () => {

const {GetUsers,Usermanagement}=useAdmin()

useEffect(()=>{

 GetUsers(get_Driver_url,"driver")
 GetUsers(get_Users_url,"user")

},[])

  return(
    <div className="flex min-h-screen mt-16"> {/* Added mt-16 for margin top */}

    
    <div className="w-1/6 bg-white h-screen ">
       <Sidebar_admin />
    </div>
    <div className="w-5/6 mt-10 pl-10 flex flex-col">
     
      
    </div>
  </div>
  )
}

export default Admin_home_page