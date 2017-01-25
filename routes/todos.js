var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('mongodb://ricardo:ricardo@ds129459.mlab.com:29459/todomeanappricardo', ['todos']);

router.get('/todos', function(req, res, next){
    db.todos.find(function(err, todos){
        if(err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});

router.get('/todo/:id', function(req, res, next){
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    },function(err, todo){
        if(err) {
            res.send(err);
        } else {
            res.json(todo);
        }
    });
});

router.post('/todo', function(req, res, next){
   var todo = req.body;
   if (!todo.text || !(todo.isCompleted + '')) {
       res.status(400);
       res.json({
           "error" : "Invalid Date"
       })
   }else {
       db.todos.save(todo, function (err, result){
           if (err) {
               res.send(err);
           }else {
               res.json(result);
           }
       })
   }
});

router.put('/todo/:id', function(req, res, next){
   var todo = req.body;
   var uppObj = {};

   if (todo.isCompleted) {
       uppObj.isCompleted = todo.isCompleted;
   }

   if (todo.text) {
       uppObj.text = todo.text;
   }

   if (!uppObj) {
       res.status(400);
       res.json({
        "error" : "Invalid Date"
       });
   } else {
       db.todos.update({
           _id: mongojs.ObjectId(req.params.id)
       }, uppObj, {}, function(err, result){
           if (err) {
               res.send(err);
           }else {
               res.json(result);
           } 
       });
   }
});

router.delete('/todo/:id', function(req, res, next){
    db.todos.remove({
           _id: mongojs.ObjectId(req.params.id)
       }, '',function(err, result){
           if (err) {
               res.send(err);
           }else {
               res.json(result);
           } 
       });
});

module.exports = router;