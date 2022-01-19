export const isLoggedIn = (state, value) => state.isLoggedIn = value

export const setUsername = (state, value) => state.username = value

export const setPassword = (state, value) => state.password = value

export const logout = (state) => {
  state.isLoggedIn = false
  state.dataUsers = []
  state.username = ''
  state.password = ''
}
