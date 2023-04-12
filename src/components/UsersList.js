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
    return <Skeleton times={6} />
  }

  if (error) {
    return <div>Error fetching data...</div>
  }

  return <div>{data.length}</div>
}

export default UsersList
