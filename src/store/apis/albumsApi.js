import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { faker } from '@faker-js/faker'
import { pause } from '../../hooks/pause'

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
    //REMOVE ON PRODUCTION
    fetchFn: async (...args) => {
      await pause(1000)
      return fetch(...args)
    },
  }),
  endpoints(builder) {
    return {
      removeAlbum: builder.mutation({
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: 'DELETED',
          }
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: 'Album', id: user.id }]
        },
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
        // the proviedsTags function
        // -- will automatically call with argument of (result, error, arg) -- arg for use is 'user'
        // providesTags: (result, error, user) => {
        // the auto generated tag will solve problem of RTX refecthing data only for all user not related to the one we have made the change
        providesTags: (result, error, user) => {
          return [{ type: 'Album', id: user.id }]
        },
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
export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi
export { albumsApi }
