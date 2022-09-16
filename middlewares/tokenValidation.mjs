import jwt from 'jsonwebtoken'

const verifyToken = async (req, res, next) => {
   const token = req.headers.token
   if (token) {
      const accessToken = token.split(' ')[1]
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
         if (err)
            return res.status(403).json({ message: 'Token is invalid' })
         req.user = user
         next()
      })
   } else {
      res.status(401).json({ message: 'You are not authenticated' })
   }
}

const verifyTokenAndAdmin = async (req, res, next) => {
   verifyToken(req, res, () => {
      if (req.user.permission === 'admin') {
         next()
      } else {
         console.log(req.user.permission)
         res.status(403).json({ message: 'You are not allowed to do that' })
      }
   })
}

export { verifyToken, verifyTokenAndAdmin }