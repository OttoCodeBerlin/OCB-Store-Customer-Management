const isAuth = (req, res, next) => {
  if (!req.isAuthenticated()) return res.status(403).send({ message: 'User is not logged in.' })
  //res.redirect('/login')
  next()
}

exports.isAuth = isAuth
