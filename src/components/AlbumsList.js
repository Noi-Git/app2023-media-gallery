import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store'
import Skeleton from './Skeleton'
import Button from './Button'
import AlbumsListItem from './AlbumsListItem'

const AlbumsList = ({ user }) => {
  // when calling useFetchAlbumsQuery -- we are fetching data
  // the (user) argument -- is send along to the query function in albumsApi -- query: (user) => {}
  // useFetchAlbumsQuery(user) -- is like useEffect
  const { data, error, isFetching } = useFetchAlbumsQuery(user)
  const [addAlbum, results] = useAddAlbumMutation()
  console.log(results)

  const handleAddAlbum = () => {
    addAlbum(user)
  }

  let content
  if (isFetching) {
    content = <Skeleton className='h-10 w-full' time={3} />
  } else if (error) {
    content = <div>Error loading albums.</div>
  } else {
    content = data.map((album) => {
      return <AlbumsListItem key={album.id} album={album} />
    })
  }

  return (
    <div>
      <div className='m-2 flex flex-row items-center justify-between'>
        <h3 className='text-lg font-bold'>Albums for {user.name}</h3>
        <Button loading={results.isLoading} onClick={handleAddAlbum}>
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  )
}

export default AlbumsList

// const header = <div>{album.title}</div>
//       // header={header} -- is the props passes down from line 20 above
//       return (
//         <ExpandablePanel key={album.id} header={header}>
//           List of photos in the album
//         </ExpandablePanel>
//       )
