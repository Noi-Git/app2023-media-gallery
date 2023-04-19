import { useFetchPhotosQuery, useAddPhotoMutation } from '../store'
import Button from './Button'

const PhotosList = ({ album }) => {
  useFetchPhotosQuery(album)

  const [addPhoto, addPhtotResult] = useAddPhotoMutation()
  return 'PhotosList'
}

export default PhotosList
