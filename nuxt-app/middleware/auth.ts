function isAuthenticated() {
  console.log('验证权限')

  return true
}

export default defineNuxtRouteMiddleware((to, from) => {
  if (isAuthenticated() === false) {
    return navigateTo('/login')
  }
})
