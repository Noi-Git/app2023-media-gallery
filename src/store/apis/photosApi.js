import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { faker } from '@faker-js/faker'

const photosApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
  }),

  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        query: (album) => {
          // provide album object to the query
          return {
            method: 'GET',
            url: '/photos',
            params: {
              albumId: album.id,
            },
          }
        },
      }),
      addPhoto: builder.mutation({
        query: (album) => {
          return {
            methos: 'POST',
            url: '/photos',
            body: {
              albumId: album.id,
              url: faker.image.abstract(150, 150, true),
            },
          }
        },
      }),
      removePhoto: builder.mutation({
        query: (photo) => {
          return {
            method: 'DELETE',
            url: `/photos/$${photo.id}`,
          }
        },
      }),
    }
  },
})
