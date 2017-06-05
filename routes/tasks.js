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

//Add a task
router.post('/task', (req, res, next) => {
  var task = req.body
  if (!task.title || task.isDone + '') {
    res.status(400)
    res.json({
      error: 'Bad Data'
    })
  } else {
    db.tasks.save(task, (err, task) => {
      if (err) {
        res.send(err)
      }
      res.json(task)
    })
  }
})

//Add a task
router.delete('/task/:id', (req, res, next) => {
  db.tasks.remove({ _id: mongojs.ObjectId(req.params.id) }, (err, task) => {
    if (err) {
      res.send(err)
    }
    res.json(task)
  })
})

//Update a task
router.put('/task/:id', (req, res, next) => {
  var task = req.body
  var updateTask = {}

  if (task.isDone) {
    udpateTask.isDone = task.isDone
  }

  if (task.title) {
    updateTask.title = task.title
  }

  if (!updateTask) {
    res.status(400)
    res.json({
      error: 'Bad Data'
    })
  } else {
    db.tasks.update(
      { _id: mongojs.ObjectId(req.params.id) },
      udpateTask,
      {},
      (err, task) => {
        if (err) {
          res.send(err)
        }
        res.json(task)
      }
    )
  }
})

module.exports = router
