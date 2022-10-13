// type predicates
interface Fish {
  swim(): void
}
interface Bird {
  fly(): void
}
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}
const zoo: (Fish | Bird)[] = []
const underWater1 = zoo.filter(isFish)

export {}
