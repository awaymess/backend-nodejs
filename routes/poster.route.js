let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router()

const { message } = require('antd')
// Student Model
let posterSchema = require('../models/poster')

// CREATE Student
router.route('/create-poster').post((req, res, next) => {
  posterSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
})

// READ Students
router.route('/').get((req, res) => {
  posterSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single Student
router.route('/edit-poster/:id').get((req, res) => {
  posterSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Student
router.route('/update-poster/:id').put((req, res, next) => {
  posterSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        res.json(data)
        console.log('Student updated successfully !')
      }
    },
  )
})

// Delete Student
router.route('/delete-poster/:id').delete((req, res, next) => {
  posterSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        // msg: data,
        message: data,
      })
    }
  })
})

module.exports = router
