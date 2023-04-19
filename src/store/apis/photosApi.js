import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

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
            url: '/photos',
            params: {
              albumId: album.id,
            },
            method: 'GET',
          }
        },
      }),
      addPhoto: builder.mutation({}),
      removePhoto: builder.mutation({}),
    }
  },
})
