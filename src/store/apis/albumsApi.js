import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { faker } from '@faker-js/faker'

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
  }),
  endpoints(builder) {
    //contain additional config of request
    return {
      addAlbum: builder.mutation({
        query: (user) => {
          return {
            url: '/albums',
            method: 'POST',
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          }
        },
      }),
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

// useFetchAlbumsQuery is a hook that auto generate by RTX
// the name came from 'fetchAlbums' -- line 12
// if we change the name on line 12 -- the hook will be generated again refecting that name
export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi
export { albumsApi }
