// DEV ONLY! -- DELETE BEFORE GOTO PRODUCTION

// create helper function to delay the handling and returning response --- so we can see the loading message
export const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
