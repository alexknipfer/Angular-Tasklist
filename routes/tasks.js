var express = require('express')
var router = express.Router()
var mongojs = require('mongojs')
var env = require('../env-config')
var db = mongojs(env.DB_CONNECTION_STRING, ['tasks'])

router.get('/tasks', (req, res, next) => {
  db.tasks.find((err, tasks) => {
    if (err) {
      res.send(err)
    }
    res.json(tasks)
  })
})

router.get('/task/:id', (req, res, next) => {
  db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, task) => {
    if (err) {
      res.send(err)
    }
    res.json(task)
  })
})

module.exports = router
