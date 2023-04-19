// export point for everyting related to redux
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { usersReducer } from './slices/usersSlice'
import { albumsApi } from './apis/albumsApi'
import { photosApi } from './apis/photosApi'

// create store
//usersReducer is the combine reducer from usersSlice
export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware)
  },
})

// TEMPORARY
// to see what we got: goto browser console -- store.getState() -- look at 'queries'
// refresh the page -- click on user dropdown -- run store.getState() -- you will see info in 'queries'
window.store = store

setupListeners(store.dispatch)

export * from './thunks/fetchUser'
export * from './thunks/addUser'
export * from './thunks/removeUser'
export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} from './apis/albumsApi'
