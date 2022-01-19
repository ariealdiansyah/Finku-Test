export const isLoggedIn = (username, password) => {
  if (username && password) {
    return true
  } else {
    return false
  }
}
