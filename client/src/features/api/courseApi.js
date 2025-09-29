import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:8081/api/v1/course";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch_Creator_Course", "Lectures", "Lecture"],
  // tagTypes: ["Refetch_Creator_Course"],
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "",
        method: "POST",
        body: {
          courseTitle,
          category,
        },
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),

    // get all published courses
    getAllPublishedCourse:builder.query({
      query:()=>({
        url:"/published-course",
        methon:"GET"
      }),
        providesTags: ["Course"],
    }),
    getCreatorCourses: builder.query({
      query: () => ({
        url: "",
        method: "get",
      }),
      providesTags: ["Refetch_Creator_Course"],
    }),
   getSearchCourse:builder.query({
      query: ({searchQuery, categories, sortByPrice}) => {
        // Build qiery string
        let queryString = `/search?query=${encodeURIComponent(searchQuery)}`

        // append cateogry 
        if(categories && categories.length > 0) {
          const categoriesString = categories.map(encodeURIComponent).join(",");
          queryString += `&categories=${categoriesString}`; 
        }

        // Append sortByPrice is available
        if(sortByPrice){
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`; 
        }

        return {
          url:queryString,
          method:"GET", 
        }
      }
    }),

    editCourse: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    getCourseById: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Course", "Course"],
    }),
    createLecture: builder.mutation({
      query: ({ lectureTitle, courseId }) => ({
        url: `/${courseId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
      invalidatesTags: ["Lectures"],
    }),
    getCourseLectures: builder.query({
      query: (courseId) => ({
        url: `/${courseId}/lecture`,
        method: "GET",
      }),
      providesTags: ["Lectures"],
    }),
    editLecture: builder.mutation({
      query: ({
        lectureTitle,
        videoInfo,
        isPreviewFree,
        courseId,
        lectureId,
      }) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method: "PUT",
        body: { lectureTitle, videoInfo, isPreviewFree },
      }),
      invalidatesTags: ["Lectures", "Lecture"],
    }),

    // remove lecture mutation--
    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lectures"],
    }),

    // get lecture data in update lecture page--
    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET",
      }),
      providesTags: ["Lecture"],
    }),

    // Mutation for publishing or unpublishing a course--
    toggelPublishUnpublish: builder.mutation({
      query: ({ courseId, query }) => ({
        url: `/${courseId}/publish?publish=${query}`,
        method: "PUT",
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});



export const {
  useCreateCourseMutation,
  useGetCreatorCoursesQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLecturesQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  useToggelPublishUnpublishMutation,
  useGetAllPublishedCourseQuery,
  useGetSearchCourseQuery
} = courseApi;
