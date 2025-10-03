import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  DollarSign,
  Users,
  BookOpen,
  Clock,
  GraduationCap,
  Server,
} from "lucide-react";
import CustomLoader from "../../components/ui/CustomLoader ";
// Note: Hook name should ideally be useGetSuperAdminDashboardStatsQuery for clarity
import { useGetSuperAdminDashboardDataQuery } from "@/features/api/superAdminApi";

const SuperAdminDashboard = () => {
  const { data, isLoading, isError } = useGetSuperAdminDashboardDataQuery();

  if (isLoading) {
    return (
      <div className="p-6">
        <CustomLoader /> {" "}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-lg text-center text-red-600 dark:text-red-400">
                        Failed to load Super Admin Dashboard data.            {" "}
      </div>
    );
  }
  const stats = data?.stats;
  console.log(stats)

  return (
    <div className="p-6 space-y-8">
                 {" "}
      <h2 className="text-3xl font-bold tracking-tight">System Overview</h2>   
             {" "}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                       {" "}
        {/* Total Revenue Card (Revenue from total sold course amount) */}     
                 {" "}
        <Card>
                             {" "}
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                   {" "}
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                   {" "}
            <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                               {" "}
          </CardHeader>
                             {" "}
          <CardContent>
                                   {" "}
            <div className="text-2xl font-bold">
                                         {" "}
             {stats?.totalRevenue }                       {" "}
            </div>
                                   {" "}
            <p className="mt-1 text-xs text-muted-foreground">
                                          Total lifetime earnings from
              successful purchases.                        {" "}
            </p>
                               {" "}
          </CardContent>
                         {" "}
        </Card>
                        {/* Total Users Card */}               {" "}
        <Card>
                             {" "}
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                   {" "}
            <CardTitle className="text-sm font-medium">Total Users</CardTitle> 
                                 {" "}
            <Users className="w-4 h-4 text-muted-foreground" />                 
             {" "}
          </CardHeader>
                             {" "}
          <CardContent>
                                   {" "}
            <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div> 
                                 {" "}
            <p className="mt-1 text-xs text-muted-foreground">
                                          All registered accounts.              
                       {" "}
            </p>
                               {" "}
          </CardContent>
                         {" "}
        </Card>
                                        {/* Total Students Card */}             
         {" "}
        <Card>
                             {" "}
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                   {" "}
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
                                   {" "}
            <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                               {" "}
          </CardHeader>
                             {" "}
          <CardContent>
                                   {" "}
            <div className="text-2xl font-bold">
              {stats?.totalStudents || 0}
            </div>
                                   {" "}
            <p className="mt-1 text-xs text-muted-foreground">
                                          Users with student roles.            
                         {" "}
            </p>
                               {" "}
          </CardContent>
                         {" "}
        </Card>
                        {/* Total Instructors Card */}               {" "}
        <Card>
                             {" "}
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                   {" "}
            <CardTitle className="text-sm font-medium">
              Total Instructors
            </CardTitle>
                                   {" "}
            <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                               {" "}
          </CardHeader>
                             {" "}
          <CardContent>
                                   {" "}
            <div className="text-2xl font-bold">
              {stats?.totalInstructors || 0}
            </div>
                                   {" "}
            <p className="mt-1 text-xs text-muted-foreground">
                                          Users with instructor roles.          
                           {" "}
            </p>
                               {" "}
          </CardContent>
                         {" "}
        </Card>
                        {/* Total Courses Card */}               {" "}
        <Card>
                             {" "}
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                   {" "}
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                                   {" "}
            <Server className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />     
                         {" "}
          </CardHeader>
                             {" "}
          <CardContent>
                                   {" "}
            <div className="text-2xl font-bold">{stats?.totalCourses || 0}</div>
                                   {" "}
            <p className="mt-1 text-xs text-muted-foreground">
                                          Total courses available on the
              platform.                        {" "}
            </p>
                               {" "}
          </CardContent>
                         {" "}
        </Card>
                                        {/* Unpublished Courses Card */}       
               {" "}
        <Card className="border-yellow-500">
                             {" "}
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                   {" "}
            <CardTitle className="text-sm font-medium">
              Unpublished Courses
            </CardTitle>
                                   {" "}
            <Clock className="w-4 h-4 text-yellow-600" />                   {" "}
          </CardHeader>
                             {" "}
          <CardContent>
                                   {" "}
            <div className="text-2xl font-bold text-yellow-600">
              {stats?.unPublishedCourse || 0}
            </div>
                                   {" "}
            <p className="mt-1 text-xs text-muted-foreground">
                                          Courses awaiting review and approval.
                                     {" "}
            </p>
                               {" "}
          </CardContent>
                         {" "}
        </Card>
                   {" "}
      </div>
             {" "}
    </div>
  );
};

export default SuperAdminDashboard;

