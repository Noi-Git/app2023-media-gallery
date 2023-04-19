import { GoTrashcan } from 'react-icons/go'
import { useRemovePhotoMutation } from '../store'

const PhotosListItem = ({ photo }) => {
  return (
    <div className='relative m-2 cursor-pointer'>
      <img
        src={photo.url}
        alt={`random pic of ${photo.title}`}
        className='h-20 w-20'
      />
      <div className='absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80'>
        <GoTrashcan className='tex-3xl' />
      </div>
    </div>
  )
}

export default PhotosListItem
