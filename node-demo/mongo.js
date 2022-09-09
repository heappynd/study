db.users.update({ username: 'leo' }, { $set: { age: 2000 } })

db.users.update({ username: 'leo' }, { $inc: { age: 10 } })

db.users.update({ username: 'leo' }, { $inc: { age: -10 } })

db.users.save([
  { username: 'wangwu', age: 10 },
  { username: 'zhao6', age: 50 },
])

db.users.find()

db.users.find({ username: 'andy' })
// $lt
db.users.find({ age: { $gt: 20 } })
db.users.find({ age: { $gte: 20 } })

db.users.find({ username: /zh/ })

db.users.find({}, { username: 1, _id: 0 })

db.users.find({}).sort({ age: 1 })
db.users.find({}).sort({ age: -1 })

// pagination
db.users.find().skip(2).limit(2)

db.users.find({ $or: [{ age: 10 }, { age: 20 }] })

db.users.findOne()

db.users.find().count()
