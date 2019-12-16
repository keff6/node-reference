const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
  _id: userOneId,
  name: 'Mike',
  email: 'mike@test.com',
  password: 'Mike45!2',
  tokens: [{
    token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
  }]
}

const userOTwoId = new mongoose.Types.ObjectId()
const userTwo = {
  _id: userOTwoId,
  name: 'Chester',
  email: 'chester@test.com',
  password: 'Badminton!2',
  tokens: [{
    token: jwt.sign({_id: userOTwoId}, process.env.JWT_SECRET)
  }]
}

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: 'test task data',
  completed: false,
  owner: userOneId,
}

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: 'test task data two',
  completed: true,
  owner: userOneId,
}

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: 'test task data 3',
  completed: false,
  owner: userTwoId,
}

const setupDatabase = async () => {
  await User.deleteMany()
  await Task.deleteMany()
  await new User(userOne).save()
  await new User(userTwo).save()
  await new Task(taskOne).save()
  await new Task(taskTwo).save()
  await new Task(taskThree).save()
}

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDatabase,
}