import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUsers } from '../store'

const UsersList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // run thunk
    dispatch(fetchUsers())
  }, [dispatch]) // add [dispatch] to sholve react warning

  return <div>UsersList</div>
}

export default UsersList
