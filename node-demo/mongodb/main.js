import './config/db.config.js'
import UserModel from './model/UserModel.js'

function create() {
  UserModel.create({
    username: 'kangshifu',
    age: 12,
    password: '123456',
  }).then((data) => {
    console.log(data)
  })
}

function update() {
  UserModel.updateOne(
    {
      _id: '631b6667ed26b351be047605',
    },
    { age: 77 }
  ).then((data) => {
    console.log(data)
  })
}

function del() {
  UserModel.deleteOne({
    _id: '631b6667ed26b351be047605',
  }).then((data) => {
    console.log(data)
  })
}

// del()

function list(current, pageSize) {
  UserModel.find({}, ['username', 'age'])
    .sort({ age: -1 })
    .skip((current - 1) * pageSize)
    .limit(pageSize)
    .then((data) => {
      console.log(data)
    })
}
list(1, 2)

// update()
