import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store'
import Skeleton from './Skeleton'
import ExpandablePanel from './ExpandablePanel'
import Button from './Button'

const AlbumsList = ({ user }) => {
  // when calling useFetchAlbumsQuery -- we are fetching data
  // the (user) argument -- is send along to the query function in albumsApi -- query: (user) => {}
  // useFetchAlbumsQuery(user) -- is like useEffect
  const { data, error, isLoading } = useFetchAlbumsQuery(user)
  const [addAlbum, results] = useAddAlbumMutation()

  const handleAddAlbum = () => {
    addAlbum(user)
  }

  let content
  if (isLoading) {
    content = <Skeleton time={3} />
  } else if (error) {
    content = <div>Error loading albums.</div>
  } else {
    content = data.map((album) => {
      const header = <div>{album.title}</div>
      // header={header} -- is the props passes down from line 20 above
      return (
        <ExpandablePanel key={album.id} header={header}>
          List of photos in the album
        </ExpandablePanel>
      )
    })
  }

  return (
    <div>
      <div>
        Albums for {user.name}
        <Button onClick={handleAddAlbum}>+ Add Album</Button>
      </div>
      <div>{content}</div>
    </div>
  )
}

export default AlbumsList
