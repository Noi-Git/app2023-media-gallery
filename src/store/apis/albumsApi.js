import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
  }),
  endpoints(builder) {
    //contain additional config of request
    return {
      fetchAlbums: builder.query({
        query: (user) => {
          return
        },
      }),
    }
  },
})
