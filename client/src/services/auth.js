export const isBrowser = () => typeof window !== "undefined"
export const getUser = () =>
  isBrowser() && window.sessionStorage.getItem("gatsbyUser")
    ? JSON.parse(window.sessionStorage.getItem("gatsbyUser"))
    : {}
export const setUser = user =>
  window.sessionStorage.setItem("gatsbyUser", JSON.stringify(user))

export const isLoggedIn = () => {
  const user = getUser();
  return !!user.name
}
export const logout = callback => {
  setUser({})
  callback()
}