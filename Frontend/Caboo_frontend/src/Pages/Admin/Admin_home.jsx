import React, { useState } from "react";
import Admin_header from "../../Components/Admin/Admin_header";
import Footer from "../../Components/Footer";
import Admin_home_page from "../../Components/Admin/Admin_home_pag";
import Sidebar_admin from "../../Components/Admin/Sidebar_admin";
import TripListing from "../../Components/Admin/TripListing";
import Coupons from "../../Components/Admin/Coupons";
import User_list_page from "../../Components/Admin/User_list_page";
import Drivers_list_page from "../../Components/Admin/Drivers_list_page";

const Admin_home = () => {
  const [activepage, setActivePage] = useState("home");

  console.log(activepage, "active page");
  return (
    <div className="bg-black">
      <Admin_header />
      <div className="flex mt-20">
        <div className="w-1/6 pt-16">
          <Sidebar_admin activepage={setActivePage} />
        </div>
        <div className="w-5/6 bg-white  pt-10 rounded-tl-[5rem]">
          {activepage === "home" && <Admin_home_page />}
          {activepage === "trip" && <TripListing />}
          {activepage === "user" && <User_list_page />}
          {activepage === "driver" && <Drivers_list_page />}
          {activepage === "coupon" && <Coupons />}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Admin_home;
