const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken()
    res.status(201).send({user, token})
  } catch (error) {
    res.status(400).send(error)
  }

  // user.save()
  //     .then((user) => {  res.status(201).send(user) })
  //     .catch((error) => {
  //       res.status(400).send(error)
  //     })
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (error) {
    res.status(400).send()
  }
})

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
    await req.user.save()

    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()

    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

// router.get('/users', auth, async (req, res) => {
//   try {
//     const users =  await User.find({})
//     res.send(users)
//   } catch(error) {
//     res.status(500).send()
//   }
// })
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUdates.includes(update))

  if(!isValidOperation) return res.status(400).send({ error: 'Invalid updates!'})

  try {
    const {user} = req
    updates.forEach(update => user[update] = req.body[update])
    await user.save()
    res.status(200).send(user)
  } catch(e) {
    res.status(400).send(e)
  }
})

router.delete('/users/me', auth, async (req,res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id)

    // if(!user) return res.status(404).send()

    await res.user.remove()
    res.status(200).send(req.user)
  } catch(e) {
    res.status(400).send(e)
  }
})

module.exports = router

