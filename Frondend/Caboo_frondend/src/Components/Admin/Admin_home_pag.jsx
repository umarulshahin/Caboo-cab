import Sidebar_admin from "./Sidebar_admin"


const Admin_home_page = () => {
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