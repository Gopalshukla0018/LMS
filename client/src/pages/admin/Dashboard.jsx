import React from "react";
import { useGetDashboardDataQuery } from "@/features/api/adminApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, Users, BookOpen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { data, isLoading, error } = useGetDashboardDataQuery();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Error: {error.data?.message || "Could not load dashboard data."}
      </div>
    );
  }

  const dashboardData = data?.data;

  const chartData = dashboardData.sales.map((sale) => ({
    name: sale.course.courseTitle.split(" ")[0],
    sales: sale.course.coursePrice,
  }));

  return (
    <div className="flex-1 p-4 space-y-6 sm:p-6">
      <h1 className="text-2xl font-bold sm:text-3xl">Instructor Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold sm:text-2xl">
              ₹{dashboardData.totalRevenue.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold sm:text-2xl">
              +{dashboardData.totalStudents}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <BookOpen className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold sm:text-2xl">
              +{dashboardData.sales.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart + Table */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip cursor={{ fill: "rgba(128, 128, 128, 0.1)" }} />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
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
                      <TableCell className="font-medium">
                        {sale.course.courseTitle}
                      </TableCell>
                      <TableCell>{sale.user.name}</TableCell>
                      <TableCell className="text-right">
                        ₹{sale.course.coursePrice.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const DashboardSkeleton = () => (
  <div className="flex-1 p-4 space-y-6 sm:p-6 animate-pulse">
    <Skeleton className="w-40 h-6 sm:w-48 sm:h-8" />
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Skeleton className="h-24 sm:h-28" />
      <Skeleton className="h-24 sm:h-28" />
      <Skeleton className="h-24 sm:h-28" />
    </div>
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Skeleton className="h-72 sm:h-80" />
      <Skeleton className="h-72 sm:h-80" />
    </div>
  </div>
);

export default Dashboard;

