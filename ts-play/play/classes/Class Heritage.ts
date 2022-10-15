interface Pingable {
  ping(): void
}
interface Pongable {
  pong(name: string): boolean
}

class Sonar implements Pingable, Pongable {
  // ** It doesn’t change the type of the class or its methods at all.
  pong(name) {
    console.log(name)
  }
  ping() {
    console.log('ping')
  }
}
