import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { faker } from '@faker-js/faker'
import { pause } from '../../hooks/pause'

const addUser = createAsyncThunk('users/add', async () => {
  const response = await axios.post('http://localhost:3005/users', {
    name: faker.name.fullName(),
  })

  // DEV ONLY! -- DELETE BEFORE GOTO PRODUCTION
  await pause(1000)

  return response.data // this info will show up as payload
})

export { addUser }
