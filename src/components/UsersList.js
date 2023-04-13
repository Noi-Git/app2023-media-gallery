import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useThunk } from '../hooks/use-thunk'
import Button from './Button'
import { fetchUsers, addUser, removeUser } from '../store'
import Skeleton from './Skeleton'
import UsersListItem from './UsersListItem'

const UsersList = () => {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers)
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser)

  const { data } = useSelector((state) => {
    return state.users
  })

  useEffect(() => {
    doFetchUsers()
  }, [doFetchUsers])

  let content
  if (isLoadingUsers) {
    content = <Skeleton times={6} className='h-10 w-full' />
  } else if (loadingUsersError) {
    content = <div>Error fetching data...</div>
  } else {
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user} /> // pass user to UsersListItem via props
    })
  }

  const handleUserAdd = () => {
    doCreateUser()
  }

  return (
    <div>
      <div className='flex flex-row justify-between items-center m-3'>
        <h1 className='m-2 text-xl'>Users</h1>
        {/* when 'isCreatingUser' is true --- apply these style */}
        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add User
        </Button>

        {creatingUserError && 'Error creating user...'}
      </div>
      <div>{content}</div>
    </div>
  )
}

export default UsersList
