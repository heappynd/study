class Bus {
  #subs = []

  subscribe(cb) {
    this.#subs.push(cb)
  }

  publish() {
    this.#subs.forEach((sub) => sub())
  }
}
export const bus = new Bus()
