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
  const runThunk = useCallback(() => {
    setIsLoading(true)
    dispatch(thunk())
      .unwrap()
      .catch((err) => setError(err))
      .finally(setIsLoading(false))
  }, [dispatch, thunk])
  return [runThunk, isLoading, error]
}

const UsersList = () => {
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [loadingUsersError, setLoadingUsersError] = useState(null)
  const [isCreatingUser, setIsCreatingUser] = useState(false)
  const [creatingUserError, setCreatingUserError] = useState(null)

  const dispatch = useDispatch()
  const { data } = useSelector((state) => {
    return state.users
  })

  useEffect(() => {
    setIsLoadingUsers(true)

    dispatch(fetchUsers())
      .unwrap()
      .catch((err) => setLoadingUsersError(err))
      .finally(() => setIsLoadingUsers(false))
  }, [dispatch])

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
    setIsCreatingUser(true)
    dispatch(addUser())
      .unwrap()
      // .then(() => {})
      .catch((err) => {
        setCreatingUserError(err)
      })
      .finally(() => {
        setIsCreatingUser(false)
      })
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
