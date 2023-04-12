import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../store'
import Skeleton from './Skeleton'

const UsersList = () => {
  const dispatch = useDispatch()
  const { isLoading, data, error } = useSelector((state) => {
    // return state.users //{data: [], isLoading: false, error: null}

    // we are going to destructure those properties
    return state.users
  })

  useEffect(() => {
    // run thunk
    dispatch(fetchUsers())
  }, [dispatch]) // add [dispatch] to sholve react warning

  if (isLoading) {
    return <Skeleton times={6} className='h-10 w-full' />
  }

  if (error) {
    return <div>Error fetching data...</div>
  }

  const renderdUsers = data.map((user) => {
    return (
      <div key={user.id} className='mb-2 border rounded'>
        <div className='flex p-2 justify-between items-center cursor-pointer'>
          {user.name}
        </div>
      </div>
    )
  })
  return <div>{renderdUsers}</div>
}

export default UsersList
