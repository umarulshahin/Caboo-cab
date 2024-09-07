import React, { useEffect, useState } from "react";
import Driver_Header from "../../Components/Driver/Driver_Header";
import Footer from "../../Components/Footer";
import useGetUser from "../../Hooks/useGetUser";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import DriverHomePage from "../../Components/Driver/DriverHomePage";
import useDriver from "../../Hooks/useDriver";

const Driver_home = () => {
  const currentMonth = new Date().getMonth()+1;
  const currentYear = new Date().getFullYear();
  const { Get_data } = useGetUser();
  const { DriverTrips } = useDriver();
  const driver_token = useSelector((state) => state.driver_data.driver_token);
  const trips = useSelector((state) => state.driver_data.driverTrips);
  const driver = useSelector((state) => state.driver_data.driver_data);
  const [trip_data, setTripdata] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      if (driver_token.user_id) {
        await DriverTrips({ id: driver_token.user_id });
      }
    };

    fetchTrips();
  }, []);


  useEffect(() => {
    const message = localStorage.getItem("loginMessage");

    if (message) {
      toast.success(message);

      localStorage.removeItem("loginMessage");
    }
  }, []);


  useEffect(() => {
    
    //* Dashboard data calculations
       
    // cancel trips

    const cancel = trips.reduce((total, item) => {
      if (item.status === "cancelled") {
        return (total += 1);
      } else {
        return total;
      }
    }, 0);

    // current month count

    const MonthCount = trips.reduce((count, trip) => {
      const tripDate = new Date(trip.dataTime);
      
      if (tripDate.getMonth()+1 === currentMonth && tripDate.getFullYear() === currentYear) {
        return count + 1;
      }
      return count;
    }, 0);

    // total driver get amount

    const amount = trips.reduce((total, item) => {
      if(item.status === 'completed'){
         return (total += item.amount);
      }else{
        return total
      }
     
    }, 0);
     
    // total trip count
    const trip_count = trips.length;
    console.log(MonthCount, "count");

    const data = {
      count: trip_count,
      cancel: cancel,
      amount: amount,
      currentMonth:MonthCount
    };
    if (data) {
      setTripdata(data);
    }

  }, [trips]);

  return (
    <div>
      <div>
        <Driver_Header />
      </div>
      <div className="flex-grow bg-black h-screen">
        <DriverHomePage trip_data={trip_data} />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Driver_home;
