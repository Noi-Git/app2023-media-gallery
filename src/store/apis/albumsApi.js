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
          return {
            // tell redux toolkit query -- how to make a request to fetch the list of album
            url: '/albums',
            params: {
              userId: user.id,
            },
            method: 'GET',
          }
        },
      }),
    }
  },
})

export const { useFetchAlbumsQuery } = albumsApi
export { albumsApi }
