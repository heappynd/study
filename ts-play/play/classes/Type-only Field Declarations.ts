interface Animal {
  dateOfBirth: any
}

interface Dog extends Animal {
  breed: any
}

class AnimalHouse {
  resident: Animal
  constructor(animal: Animal) {
    this.resident = animal
  }
}

class DogHouse extends AnimalHouse {
  constructor(dog: Dog) {
    super(dog)
  }
}

class MsgError extends Error {
  constructor(m: string) {
    super(m)
  }
  sayHello() {
    return 'hello ' + this.message
  }
}

export {}
