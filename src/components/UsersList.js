import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from './Button'
import { fetchUsers, addUser } from '../store'
import Skeleton from './Skeleton'

const UsersList = () => {
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [loadingUsersError, setLoadingUsersError] = useState(null)

  const dispatch = useDispatch()
  const { data } = useSelector((state) => {
    // return state.users //{data: [], isLoading: false, error: null} -- but we only need data

    return state.users
  })

  useEffect(() => {
    setIsLoadingUsers(true)
    // run thunk
    // console.log(dispatch(fetchUsers()))
    dispatch(fetchUsers())
      // use unwrap() to fix problem with dispatch promise
      // .unwrap() --- will give us a brand new promise -- so we can follow with the conventional: .then() and .catch()
      .unwrap()
      .then(() => {
        console.log('success')
      })
      .catch((err) => {
        console.log('failed')
        setLoadingUsersError(err)
      })
      // the .finally will be call no matter whether the request success or failed
      .finally(() => {
        setIsLoadingUsers(false)
      })
  }, [dispatch]) // add [dispatch] to sholve react warning

  // if (isLoadingUsers) {
  //   return <Skeleton times={6} className='h-10 w-full' />
  // }

  // if (loadingUsersError) {
  //   return <div>Error fetching data...</div>
  // }

  const renderdUsers = data.map((user) => {
    return (
      <div key={user.id} className='mb-2 border rounded'>
        <div className='flex p-2 justify-between items-center cursor-pointer'>
          {user.name}
        </div>
      </div>
    )
  })

  const handleUserAdd = () => {
    // for thunk -- will use -- dispatch(pass in the thunk function - and call it)
    dispatch(addUser())
  }

  return (
    <div>
      <div className='flex flex-row justify-between m-3'>
        <h1 className='m-2 text-xl'>Users</h1>
        <Button onClick={handleUserAdd}>+ Add User</Button>
      </div>
      <div>{renderdUsers}</div>
    </div>
  )
}

export default UsersList
