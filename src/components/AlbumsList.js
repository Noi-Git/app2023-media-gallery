import { useFetchAlbumsQuery } from '../store'

const AlbumsList = ({ user }) => {
  // when calling useFetchAlbumsQuery -- we are fetching data
  // the (user) argument -- is send along to the query function in albumsApi -- query: (user) => {}
  // useFetchAlbumsQuery(user) -- is like useEffect
  // const { data, error, isLoading } = useFetchAlbumsQuery(user)
  const result = useFetchAlbumsQuery(user)

  // console.log(data, error, isLoading)
  console.log('-- result --: ', result)

  return <div>Albums for {user.name}</div>
}

export default AlbumsList
