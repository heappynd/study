// 从特定于 React 的入口点导入 RTK Query 方法
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// 定义我们的单个 API Slice 对象
export const apiSlice = createApi({
  // 缓存减速器预计将添加到 `state.api` （已经默认 - 这是可选的）
  reducerPath: 'api',
  // 我们所有的请求都有以 “/fakeApi” 开头的 URL
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:4523/m1/2038300-0-default/fakeApi',
  }),
  tagTypes: ['Post'],
  // “endpoints” 代表对该服务器的操作和请求
  endpoints: (builder) => ({
    // `getPosts` endpoint 是一个返回数据的 “Query” 操作
    getPosts: builder.query({
      // 请求的 URL 是“/fakeApi/posts”
      query: () => '/posts',
      providesTags: ['Post'],
    }),
    getPost: builder.query({
      query: (postId) => `/posts/${postId}`,
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: `/posts`,
        method: 'post',
        body: initialPost,
      }),
      invalidatesTags: ['Post'],
    }),
  }),
})

// 为 `getPosts` Query endpoint 导出自动生成的 hooks
export const { useGetPostsQuery, useGetPostQuery, useAddNewPostMutation } =
  apiSlice
