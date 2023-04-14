import { GoTrashcan } from 'react-icons/go'
import Button from './Button'
import ExpandablePanel from './ExpandablePanel'

const AlbumsListItem = ({ album }) => {
  const header = (
    <div>
      <Button loading={''}>
        <GoTrashcan />
      </Button>
      {album.title}
    </div>
  )
  return (
    <ExpandablePanel key={album.id} header={header}>
      List of photos in the album
    </ExpandablePanel>
  )
}

export default AlbumsListItem
