import React from "react";

// import { useGetDashboardDataQuery } from "@/features/api/instructorApi"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, Users, BookOpen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
// Recharts se components import karein
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // const { data, isLoading, error } = useGetDashboardDataQuery();
  const isLoading = false;
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  // Jab tak backend taiyaar nahi hai, hum yeh dummy data use karenge
  const dummyData = {
    totalRevenue: 7250.50,
    totalStudents: 150,
    sales: [
      { _id: '1', courseId: { courseTitle: 'React - The Complete Guide', coursePrice: 499 }, userId: { name: 'Rohan Sharma' }, createdAt: new Date() },
      { _id: '2', courseId: { courseTitle: 'Node.js for Beginners', coursePrice: 599 }, userId: { name: 'Priya Patel' }, createdAt: new Date() },
      { _id: '3', courseId: { courseTitle: 'Full Stack Web Development', coursePrice: 999 }, userId: { name: 'Amit Kumar' }, createdAt: new Date() },
      { _id: '4', courseId: { courseTitle: 'React - The Complete Guide', coursePrice: 499 }, userId: { name: 'Sunita Devi' }, createdAt: new Date() },
    ],
  };

  // Jab asli data aayega to yeh 'dashboardData' use karega, abhi dummyData use karega
  const dashboardData =dummyData;

  
  // Chart ke liye data format karein
  const chartData = dashboardData.sales.map(sale => ({
      name: sale.courseId.courseTitle.split(' ')[0], // Course ka pehla shabd
      sales: sale.courseId.coursePrice,
  }));


  return (
    <div className="flex-1 p-6 space-y-6">
      <h1 className="text-3xl font-bold">Instructor Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{dashboardData.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{dashboardData.totalStudents}</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <BookOpen className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{dashboardData.sales.length}</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart and Recent Sales Table */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardData.sales.map((sale) => (
                  <TableRow key={sale._id}>
                    <TableCell className="font-medium">{sale.courseId.courseTitle}</TableCell>
                    <TableCell>{sale.userId.name}</TableCell>
                    <TableCell className="text-right">₹{sale.courseId.coursePrice.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Loading state ke liye Skeleton component
const DashboardSkeleton = () => (
    <div className="flex-1 p-6 space-y-6 animate-pulse">
        <Skeleton className="w-48 h-8" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-80" />
            <Skeleton className="h-80" />
        </div>
    </div>
);


export default Dashboard;