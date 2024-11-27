import React, { useState, useEffect } from 'react';
import { Users, Calendar, DollarSign, TrendingUp, ShoppingBag, Star } from 'lucide-react';
import StatsCard from '../components/stats/StatsCard';
import RevenueChart from '../components/stats/RevenueChart';
import AppointmentsList from '../components/stats/AppointmentsList';
import PopularServices from '../components/stats/PopularServices';
import PopularPackages from '../components/stats/PopularPackage';
import StaffPerformance from '../components/stats/StaffPerformance';
import {
  getcustomergrowth,
  getappointmentsmetrics,
  getweeklyrevenue,
  getservicebookedmetrics,
  getpackagesbookedmetrics,
  getmonthlygrowth,
  getservicebreakdown,
  getupcomingappointments,
  getpackagesbreakdown,
  getstaffperformance
} from './../../Service/StatsService';


interface Appointment {
  id: string;
  customerName: string;
  service: string;
  time: string;
  image: string;
}
const Dashboard = () => {
  const [stats, setStats] = useState([
    {
      icon: Users,
      label: 'Total Customers',
      value: '...',
      trend: '...',
      trendColor: 'gray'
    },
    {
      icon: Calendar,
      label: 'Appointments Today',
      value: '...',
      trend: '...',
      trendColor: 'gray'
    },
    {
      icon: DollarSign,
      label: 'Revenue Today',
      value: '...',
      trend: '...',
      trendColor: 'gray'
    },
    {
      icon: ShoppingBag,
      label: 'Services Booked',
      value: '...',
      trend: '...',
      trendColor: 'gray'
    },
    {
      icon: Star,
      label: 'package Bookedg',
      value: '...',
      trend: '...',
      trendColor: 'gray'
    },
    {
      icon: TrendingUp,
      label: 'Monthly Growth',
      value: '...',
      trend: '...',
      trendColor: 'gray'
    }
  ]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          customerData,
          appointmentsData,
           
          servicesData,
          packageData,
          monthlyGrowthData
        ] = await Promise.all([
          getcustomergrowth(5),
          getappointmentsmetrics(5),
         
          getservicebookedmetrics(5),
          getpackagesbookedmetrics(5),
      
          getmonthlygrowth(5)
        ]);

        setStats(prevStats => {
          const newStats = [...prevStats];
          
          // Update customers stat
          newStats[0] = {
            ...newStats[0],
            value: customerData.currentMonthCustomers.toLocaleString(),
            trend: `${customerData.growthPercentage >= 0 ? '+' : ''}${customerData.growthPercentage}%`,
            trendColor: customerData.growthPercentage >= 0 ? 'green' : 'red'
          };

          // Update appointments stat
          newStats[1] = {
            ...newStats[1],
            value: appointmentsData.todayAppointments.toString(),
            trend: `${appointmentsData.growthPercentage >= 0 ? '+' : ''}${appointmentsData.growthPercentage}%`,
            trendColor: appointmentsData.growthPercentage >= 0 ? 'green' : 'red'
          };

          // Update revenue stat
          newStats[2] = {
            ...newStats[2],
            value: `${monthlyGrowthData.monthlyGrowth.revenue.current.toLocaleString()}`,
            trend: `${monthlyGrowthData.monthlyGrowth.revenue.growth >= 0 ? '+' : ''}${monthlyGrowthData.monthlyGrowth.revenue.growth}%`,
            trendColor: monthlyGrowthData.monthlyGrowth.revenue.growth >= 0 ? 'green' : 'red'
          };

          // Update services stat
          newStats[3] = {
            ...newStats[3],
            value: servicesData.currentMonthServiceBooked.toString(),
            trend: `${servicesData.growthPercentage >= 0 ? '+' : ''}${servicesData.growthPercentage}%`,
            trendColor: servicesData.growthPercentage >= 0 ? 'green' : 'red'
          };

          // Update rating stat (assuming it comes from one of the metrics)
          // You might need to add a new API endpoint for this
          newStats[4] = {
            ...newStats[4],
            value: packageData.currentMonthPackagesBooked.toString(),
            trend: `${packageData.growthPercentage >= 0 ? '+' : ''}${packageData.growthPercentage}%`,
            trendColor: packageData.growthPercentage >= 0 ? 'green' : 'red'
          };

          // Update monthly growth stat
          newStats[5] = {
            ...newStats[5],
            value: `${monthlyGrowthData.monthlyGrowth.reservations.current}%`,
            trend: `${monthlyGrowthData.monthlyGrowth.reservations.growth >= 0 ? '+' : ''}${monthlyGrowthData.monthlyGrowth.reservations.growth}%`,
            trendColor: monthlyGrowthData.monthlyGrowth.reservations.growth>= 0 ? 'green' : 'red'
          };

          return newStats;
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []); 

  const [isLoading, setIsLoading] = useState(true);
  const [revenueData, setRevenueData] = useState([]);
  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        setIsLoading(true);
        
        const data = await getweeklyrevenue(5);
        
      
        
        setRevenueData(data);
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchRevenueData();
  }, []); 

 
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const data = await getupcomingappointments(5);
        setAppointments(data);
      } catch (error) {
        // Handle error appropriately
        console.error(error);
      }
    };
  
    loadInitialData();
  }, []);
   
 

  const [popularServices, setPopularServices] = useState<Array<{
    name: string;
    bookings: number;
    revenue: number;
  }>>([]);
  
  useEffect(() => {
    const fetchServiceMetrics = async () => {
      try {
        // Replace with actual salon ID
        const response = await getservicebreakdown(5);
        
        // Transform the backend response to match the existing data structure
        
        const formattedServices2 = response.mostPopularPackages.map((item:any) => {
          // Check if the required properties exist
          if (!item || 
              !item.SalonService || 
              !item.SalonService.name || 
              item.packageCount === undefined || 
              !item.totalRevenue) {
              console.warn('Invalid data entry:', item);
              return null;
          }
      
          try {
              return {
                  name: 'Service: ' + item.SalonService.name, 
                  bookings: item.packageCount, 
                  revenue: parseFloat(item.totalRevenue.replace(/,/g, ''))
              };
          } catch (error) {
              console.error('Error processing data entry:', error);
              return null;
          }
      }).filter((entry:any) => entry !== null); //
        setPopularServices(formattedServices2);
      } catch (error) {
        console.error('Failed to fetch service metrics:', error);
        // Optionally set an error state or show a notification
      }
    };
  
    fetchServiceMetrics();
  }, []);

  
  const [PopularPackage, setPopularPackage] = useState<Array<{
    name: string;
    bookings: number;
    revenue: number;
  }>>([]);
  
  useEffect(() => {
    const fetchpackageMetrics = async () => {
      try {
        // Replace with actual salon ID
        const response = await getpackagesbreakdown(5);
        
        // Transform the backend response to match the existing data structure
       
        const formattedServices2 = response.mostPopularPackages.map((item:any) => {
          // Check if the required properties exist
          if (!item || 
              !item.packagesService || 
              !item.packagesService.name || 
              item.packageCount === undefined || 
              !item.totalRevenue) {
              console.warn('Invalid data entry:', item);
              return null;
          }
      
          try {
              return {
                  name: 'Service: ' + item.packagesService.name, 
                  bookings: item.packageCount, 
                  revenue: parseFloat(item.totalRevenue.replace(/,/g, ''))
              };
          } catch (error) {
              console.error('Error processing data entry:', error);
              return null;
          }
      }).filter((entry:any) => entry !== null); //
      setPopularPackage(formattedServices2);
      } catch (error) {
        console.error('Failed to fetch service metrics:', error);
        // Optionally set an error state or show a notification
      }
    };
  
    fetchpackageMetrics();
  }, []);


  const [staffStats, setStaffStats]  = useState<Array<{
    id: string;
    name: string;
    image: string;
    appointments: number;
    revenue: number;
  }>>([]);
  

  useEffect(() => {
    const fetchStaffPerformance = async () => {
      try {
        // Assume you have the salon ID from context or props
         // Replace with actual salon ID
        const performanceData = await getstaffperformance(5);
        setStaffStats(performanceData);
      ;
      } catch (err) {
        console.error('Failed to fetch service metrics:', err);
      }
    };

    fetchStaffPerformance();
  }, []);

  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <RevenueChart data={revenueData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppointmentsList appointments={appointments} />
        <PopularServices services={popularServices} />
        <PopularPackages packages={PopularPackage} />
        <StaffPerformance staffStats={staffStats} />
      </div>

    
    </div>
  );
};

export default Dashboard;