export {}

interface User {
  id: string
  admin: boolean
}

interface DB {
  filterUsers(filter: (this: User) => boolean): User[]
}
declare const getDB: () => DB

const db = getDB()
const admins = db.filterUsers(function () {
  return this.admin
})

// The special type object refers to any value
// that isn’t a primitive (string, number, bigint, boolean, symbol, null, or undefined).
// This is different from the empty object type { },
// and also different from the global type Object.
// It’s very likely you will never use Object.
