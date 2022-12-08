class User {
  constructor(role, pages) {
    this.role = role
    this.pages = pages
  }
  static Factory(role) {
    switch (role) {
      case 'admin':
        return new User('admin', ['users', 'posts'])
      case 'editor':
        return new User('editor', ['posts'])
      default:
        throw new Error('Invalid role')
    }
  }
}

console.log(User.Factory('admin'))

console.log(User.Factory('editor'))
