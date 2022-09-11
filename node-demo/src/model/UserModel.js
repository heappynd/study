import mongoose, { Schema } from 'mongoose'

const UserType = {
  username: String,
  password: String,
  age: Number,
}

const UserModel = mongoose.model('user', new Schema(UserType))

export default UserModel
