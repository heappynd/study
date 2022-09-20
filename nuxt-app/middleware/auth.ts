function isAuthenticated() {
  console.log('验证权限')

  return false
}

export default defineNuxtRouteMiddleware((to, from) => {
  if (isAuthenticated() === false) {
    return navigateTo('/login')
  }
})
