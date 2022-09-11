export function isLogin(req, res, next) {
  if (req.session.userId) {
    req.session.timestamp = Date.now()
    next()
  } else {
    res.status(401).send({
      code: -1,
      message: '401',
    })
  }
}
