class User {
  constructor(name) {
    this.name = name
  }
  show() {
    throw new Error('Please implement the abstract method')
  }
}

class Admin extends User {
  constructor(name) {
    super(name)
  }
  show() {
    console.log('I am admin.')
  }
  add() {
    console.log('add a user')
  }
}

class Editor extends User {
  constructor(name) {
    super(name)
  }
  show() {
    console.log('I am editor.')
  }
}

function getAbstractUserFactory(role) {
  switch (role) {
    case 'admin':
      return Admin
    case 'editor':
      return Editor
    default:
      throw new Error('Invalid role')
  }
}

const UserClass = getAbstractUserFactory('editor')

const user = new UserClass('Andy')
console.log(user)
