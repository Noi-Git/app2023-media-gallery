import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'

export const useThunk = (thunk) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  // the function below will run Thunk and dispatch and update the loading state
  const runThunk = useCallback(
    (arg) => {
      setIsLoading(true)
      dispatch(thunk(arg)) // arg will be use when we delete the user
        .unwrap()
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false))
    },
    [dispatch, thunk]
  )
  return [runThunk, isLoading, error]
}
