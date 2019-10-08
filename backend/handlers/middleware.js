const isAuth = (req, res, next) => {
  if (!req.isAuthenticated())
    return res.status(403).send({ message: 'User is not logged in. Please return to the Homepage.' })
  next()
}

exports.isAuth = isAuth
