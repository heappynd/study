const isAuthenticated = () => {
  const authenticated = Math.random() > 0.5
  console.log('authenticated', authenticated)
  return authenticated
}

export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated() is an example method verifying if an user is authenticated
  if (isAuthenticated() === false) {
    return navigateTo('/login')
  }
})
