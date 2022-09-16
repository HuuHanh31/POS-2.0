import Reserve from '../models/Reserve.mjs'

const reservationController = {
  getReservation: async (req, res) => {
    let reserve = null
    let reserveFiltered = null
    try {
      if (req.user.permission === 'clerk') {
        reserve = await Reserve.find()
        reserveFiltered = reserve.filter((reserve) => { return reserve.date >= new Date(Date.now()) })
      }
      else if (req.user.permission === 'customer') {
        reserve = await Reserve.find({ email: req.query.email })
        reserveFiltered = reserve.filter((reserve) => { return reserve.date >= new Date(Date.now()) })
      }
      else {
        return res.status(403).json({ message: 'Token is invalid' })
      }

      if (reserveFiltered)
        return res.status(200).json({ message: 'Get all reservations successfully', data: reserveFiltered })
      else
        return res.status(404).json({ message: 'Reservation is not found' })
    }
    catch (err) {
      res.status(500).json({ message: err.message })
    }
  },

  postReservation: async (req, res) => {
    try {
      const reserve = new Reserve({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        adultsNumber: req.body.adults,
        kidsNumber: req.body.kids,
        date: req.body.dateTime,
        phone: req.body.phone,
      })

      await reserve.save()
      res.status(201).json({ message: 'Create reservation successfully', data: reserve })
    }
    catch (err) {
      res.status(500).json({ message: err.message })
    }
  },

  putReservation: async (req, res) => {
    await Reserve.findByIdAndUpdate(req.params.id, req.body, (err, docs) => {
      if (err)
        res.status(500).json({ message: err.message })
      else {
        return res.status(200).json({ message: 'Update reservation successfullly', data: docs })
      }
    })
  },

  deleteReservation: async (req, res) => {
    await Reserve.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        res.status(500).json({ message: err.message })
      }
      else {
        res.status(200).json({ message: 'Delete reservation successfully' });
      }
    })
  },

  verifyReservation: async (req, res, next) => {
    try {
      const dateTime = new Date(req.body.dateTime)
      const today = new Date(Date.now())

      if (dateTime < today) {
        return res.status(400).json({ message: 'Please do not select date in the past' })
      }
      else if (Math.ceil((dateTime - today) / (1000 * 60 * 60 * 24)) < 3) {
        return res.status(400).json({ message: 'Please select date before 3 days' })
      }
      else {
        try {
          const reserves = await Reserve.find()
          const tables = reserves.filter(reserve => {
            const reserve_date = new Date(reserve.date)
            const dist = Math.abs(dateTime - reserve_date)
            const dist_minute = Math.ceil(dist / (1000 * 60))
            return dist_minute < 60
          }
          )

          if (tables.length < 10) {
            return res.status(200).json({ message: 'Reverse successfully' })
          }
          else {
            return res.status(400).json({ message: 'Sorry the table is out' })
          }
        }
        catch (err) {
          res.status(500).json({ message: err.message })
        }
      }
    }
    catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

export default reservationController