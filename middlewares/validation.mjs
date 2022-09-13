import Joi from 'joi'

const registerSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    phone: Joi.string().min(10).required(),
    password: Joi.string().min(8).required()
})

const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required()
})

const registerValidation = async (req, res, next) => {
    const value = registerSchema.validate(req.body)
    if (value.error)
        return res.status(400).json({ message: value.error.details[0].message })
    else
        next()
}

const loginValidation = async (req, res, next) => {
    const value = loginSchema.validate(req.body)
    if (value.error)
        return res.status(400).json({ message: value.error.details[0].message })
    else
        next()
}

export { registerValidation, loginValidation }