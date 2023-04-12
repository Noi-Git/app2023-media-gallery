import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from './Button'
import { fetchUsers, addUser } from '../store'
import Skeleton from './Skeleton'

const useThunk = (thunk) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  // the function below will run Thunk and dispatch and update the loading state
  const runThunk = useCallback(
    (arg) => {
      setIsLoading(true)
      dispatch(thunk(arg))
        .unwrap()
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false))
    },
    [dispatch, thunk]
  )
  return [runThunk, isLoading, error]
}

const UsersList = () => {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers)
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser)

  const dispatch = useDispatch()
  const { data } = useSelector((state) => {
    return state.users
  })

  useEffect(() => {
    doFetchUsers()
  }, [doFetchUsers])

  if (isLoadingUsers) {
    return <Skeleton times={6} className='h-10 w-full' />
  }

  if (loadingUsersError) {
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

  const handleUserAdd = () => {
    doCreateUser()
  }

  return (
    <div>
      <div className='flex flex-row justify-between m-3'>
        <h1 className='m-2 text-xl'>Users</h1>
        {isCreatingUser ? (
          'Creating user...'
        ) : (
          <Button onClick={handleUserAdd}>+ Add User</Button>
        )}

        {creatingUserError && 'Error creating user...'}
      </div>
      <div>{renderdUsers}</div>
    </div>
  )
}

export default UsersList
