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
        invalidatesTags: (result, error, album) => {
          console.log(album)
          return [{ type: 'Album', id: album.id }]

          // solution: in case the album object does not have userID
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: 'DELETE',
          }
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: 'UsersAlbums', id: user.id }]
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
        providesTags: (result, error, user) => {
          console.log('++ ', result)
          const tags = result.map((album) => {
            return { type: 'Album', id: album.id }
          })
          tags.push({ type: 'UsersAlbums', id: user.id })
          return tags
        },
        query: (user) => {
          return {
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
