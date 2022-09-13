import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.mjs'

let refreshTokens = []
const authController = {
  generateAccessToken: (user) => {
    return jwt.sign(
      { id: user.id, permission: user.permission },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: '15m' }
    )
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      { id: user.id, permission: user.permission },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: '30d' }
    )
  },

  register: async (req, res) => {
    try {
      const existUser = await User.findOne({ email: req.body.email })
      if (existUser)
        return res.status(409).json('Account is exist')

      const salt = await bcrypt.genSalt(10)
      const hashed = await bcrypt.hash(req.body.password, salt)

      const newUser = new User({
        email: req.body.email,
        phone: req.body.phone,
        password: hashed
      })

      await newUser.save()
      res.status(200).json({
        message: 'Resgister successfully',
        data: newUser
      })
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  },

  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (!user)
        return res.status(404).json('Email is not valid')

      const validPassword = await bcrypt.compare(req.body.password, user.password)
      if (!validPassword)
        return res.status(404).json('Password is not correct')

      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user)
        const refreshToken = authController.generateRefreshToken(user)
        refreshTokens.push(refreshToken)

        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: 'strict'
        })

        const { password, ...others } = user._doc
        res.status(200).json({
          message: 'Login successfully',
          data: { ...others, accessToken }
        })
      }
    } catch (e) {
      res.status(500).json({
        message: e.message
      })
    }
  },

  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken)
      return res.status(401).json({ message: 'You are not authenticated' })
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json({ message: 'Refresh token is not valid' })
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err)
        return res.status(403).json({ message: 'Refresh token is invalid' + err.message })

      refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
      const newAccessToken = authController.generateAccessToken(user)
      const newRefreshToken = authController.generateRefreshToken(user)
      refreshTokens.push(newRefreshToken)
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict'
      })
      return res.status(200).json({ accessToken: newAccessToken })
    })
  },

  logout: async (req, res) => {
    res.clearCookie('refreshToken')
    refreshTokens = refreshTokens.filter(token => token != req.cookies.refreshToken)
    res.status(200).json({ message: 'Logout successfully' })
  }
}

export default authController