const isAuthenticated = () => {
  return new Date().getSeconds() % 2 === 0
}

export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  if (isAuthenticated() === false) {
    console.warn('没有权限')
    return navigateTo('/login')
  }
})
