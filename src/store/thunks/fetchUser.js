import { createAsyncThunk } from '@reduxjs/toolkit'

// ('users/fetch') --- is create base type --- to discribe the purpose of the thunk
const fetchUsers = createAsyncThunk('users/fetch')
