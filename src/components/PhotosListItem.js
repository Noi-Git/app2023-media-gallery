import React from 'react'

const PhotosListItem = ({ photo }) => {
  return (
    <div className='relative m-2'>
      <img
        src={photo.url}
        alt={`random pic of ${photo.title}`}
        className='h-20 w-20'
      />
    </div>
  )
}

export default PhotosListItem
