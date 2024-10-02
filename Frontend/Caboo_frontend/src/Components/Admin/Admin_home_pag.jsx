import { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, BarElement, CategoryScale, LinearScale, ArcElement } from "chart.js";
import useAdmin from "../../Hooks/useAdmin";
import Sidebar_admin from "./Sidebar_admin";
import { get_Driver_url, get_Users_url } from "../../Utils/Constanse";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

const Admin_home_page = () => {
  const { GetUsers, Usermanagement } = useAdmin();
  const [userData, setUserData] = useState([]);
  const [driverData, setDriverData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await GetUsers(get_Users_url, "user");
      const driverResponse = await GetUsers(get_Driver_url, "driver");
 
      if(userResponse){
        setUserData(userResponse.data);

      }else if (driverResponse){
        setDriverData(driverResponse.data);

      }
    };

    fetchData();
  }, [GetUsers]);

  // Example data for charts (Replace with actual data)
  const tripData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Trips",
        data: [30, 45, 60, 70, 55, 80],
        borderColor: "#4A90E2",
        backgroundColor: "rgba(74, 144, 226, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  const userDataChart = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        label: "Users",
        data: [80, 20],
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const cancelData = {
    labels: ["Completed", "Cancelled"],
    datasets: [
      {
        label: "Trips",
        data: [75, 25],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div className="flex min-h-screen mt-16">
      <div className="w-1/6 bg-white h-screen">
        <Sidebar_admin />
      </div>
      <div className="w-5/6 mt-10 pl-10 flex flex-col">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Total Users</h2>
            <p className="text-2xl font-bold">{userData.length}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Total Drivers</h2>
            <p className="text-2xl font-bold">{driverData.length}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Total Profit</h2>
            <p className="text-2xl font-bold">$120,000</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Monthly Trip Data</h2>
            <Line data={tripData} options={{ responsive: true }} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">User Distribution</h2>
            <Pie data={userDataChart} options={{ responsive: true }} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg col-span-2 md:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Cancelled vs Completed Trips</h2>
            <Bar data={cancelData} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_home_page;
