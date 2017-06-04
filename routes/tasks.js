var express = require('express')
var router = express.Router()
var mongojs = require('mongojs')
var env = require('../env-config')
var db = mongojs(env.DB_CONNECTION_STRING, ['tasks'])

router.get('/tasks', function(req, res, next) {
  db.tasks.find(function(err, tasks) {
    if (err) {
      res.send(err)
    }
    res.json(tasks)
  })
})

module.exports = router
