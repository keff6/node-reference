const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

// const User = mongoose.model('User', {
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validate(value) {
//       if(!validator.isEmail(value)) {
//         throw new Error('Email is invalid')
//       }
//     }
//   },
//   password: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 7,
//     validate(value) {
//       if(value.toLowerCase().includes('password')) {
//         throw new Error('Password must not include the word password')
//       }
//     }
//   },
//   age: {
//     type: Number,
//     default: 0,
//     validate(value) {
//       if(value < 0) {
//         throw new Error('Age must be a positive number')
//       }
//     }
//   }
// })

const Task =  mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  }
})

const t1 = new Task({
  description: 'Test Task 1',
  completed: false
})

t1.save().then(() => console.log(t1)).catch(err => console.log(err))

// const me = new User({
//   name: 'Kevin',
//   age: 34,
//   email: 'kev.vin@latinmail.com',
//   password: 'F123456'
// })

// me.save()
//   .then(() => console.log(me))
//   .catch(error => console.log('Error!', error))