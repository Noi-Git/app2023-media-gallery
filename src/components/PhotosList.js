import { useFetchPhotosQuery, useAddPhotoMutation } from '../store'
import Button from './Button'

const PhotosList = ({ album }) => {
  useFetchPhotosQuery(album)

  const [addPhoto, addPhotoResult] = useAddPhotoMutation()

  const handleAddPhoto = () => {}

  return (
    <div>
      <div className='m-2 flex flex-row items-center justify-between'>
        <h3 className='text-lg font-bold'>Photos In {album.title} </h3>
        <Button loading={addPhotoResult.isLoading} onClick={handleAddPhoto}>
          + Add Photo
        </Button>
      </div>
    </div>
  )
}

export default PhotosList
