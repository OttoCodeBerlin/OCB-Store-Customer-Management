const express = require('express')
const passport = require('passport')
const User = require('../models/User')
const Customer = require('../models/Customer')
const Image = require('../models/Image')
const { isAuth } = require('../handlers/middleware')
const nodemailer = require('nodemailer')

const router = express.Router()

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return res.status(403).send({ message: err })
    if (!user) return res.status(404).send({ message: 'This user does not exist.' })

    req.logIn(user, err => {
      if (err) return res.status(500).send({ message: err.message })

      res.status(200).send(user)
    })
  })(req, res, next)
})

router.post('/signup', (req, res, next) => {
  const { username, store_location, role, password } = req.body
  User.register(
    {
      username,
      store_location,
      role
    },
    password
  )
    .then(user => {
      req.logIn(user, err => {
        if (err) return res.status(500).send({ message: err.message })
        res.status(200).send(user)
      })
    })
    .catch(err => res.status(500).send({ message: err.message }))
})

router.post('/modify_customer', (req, res, next) => {
  const { first_name, last_name, email, customer_id } = req.body
  Customer.findByIdAndUpdate(customer_id, { first_name, last_name, email })
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => res.status(500).send({ message: err.message }))
})

router.post('/modify_customer_image', (req, res, next) => {
  console.log(req.body)
  const image = new Image({
    image_name: req.body.image_name,
    image_data: req.body.image_data,
    customerId: req.body.customerId
  })
  image
    .save()
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => res.status(500).send({ message: err.message }))
})

router.post('/add_customer', isAuth, async (req, res, next) => {
  const { customer_email } = req.body
  const user_id = req.user._id
  const customer = new Customer({
    userId: user_id,
    email: customer_email
  })
  customer
    .save()
    .then(data => {
      transporter.sendMail({
        from: '"Your store via OCB Customer Management System" <mailer@ocbcms.com>',
        to: customer_email,
        subject: 'Welcome to your store - Please complete your profile',
        text:
          'Good Day! You have been added to our Store Loyalty Program. Please click the following personal link to complete your profile: ' +
          req.headers.origin +
          '/confirm/' +
          data._id +
          '. Thank you!'
      })
      res.status(200).send(data)
    })
    .catch(err => res.status(500).send({ message: err.message }))
})

router.post('/delete_customer/:id', isAuth, async (req, res, next) => {
  console.log(req.body)
  // const { customer_id } = req.body
  // Customer.findByIdAndDelete(_id: customer_id)
  //   .then(data => {
  //     res.status(200).send(data)
  //   })
  //   .catch(err => res.status(500).send({ message: err.message }))
})


// router.post('/edit', isAuth, (req, res, next) => {
//   const { _id: userId } = req.user
//   const { username, store_location, role } = req.body

//   User.findByIdAndUpdate(
//     userId,
//     {
//       username,
//       store_location,
//       role
//     },
//     { new: true }
//   )
//     .then(user => {
//       res.status(200).send(user)
//     })
//     .catch(err => res.status(500).send({ message: err.message }))
// })

router.get('/logout', isAuth, (req, res, next) => {
  req.logOut()
  res.status(200).send({ message: 'Ok' })
})

router.get('/loggedin', isAuth, (req, res, next) => {
  res.status(200).send(req.user)
})

router.get('/customers', async (req, res, next) => {
  const allCustomers = await Customer.find()
  res.status(200).json({ allCustomers })
})

router.get('/pictures', async (req, res, next) => {
  const allPictures = await Image.find()
  res.status(200).json({ allPictures })
})

router.get('/confirm/:id', (req, res, next) => {
  console.log(req.params)
  console.log(req.user)
  res.status(200).send()
})

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})

module.exports = router
