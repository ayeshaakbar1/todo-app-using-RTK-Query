import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),
  endpoints: (builder) => ({
    getTodosApi: builder.query({
      query: () => "/todos?limit=10",
    }),
    addTodoApi: builder.mutation({
      query: (todo) => ({
        url: "/todos/add",
        method: "POST",
        body: todo,
      }),
    }),
    deleteTodoApi: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useGetTodosApiQuery,
  useAddTodoApiMutation,
  useDeleteTodoApiMutation,
} = todoApi;
