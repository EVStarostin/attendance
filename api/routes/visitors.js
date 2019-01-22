const express = require('express');
const mongoose = require('mongoose');
const utils = require('../utils')
const router = express.Router();

const visitorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  archived: { type: Boolean, default: false },
});
visitorSchema.method('toClient', utils.cleanDoc);
const Visitor = mongoose.model('Visitor', visitorSchema);

/* GET visitors list */
router.get('/', function(req, res, next) {
  const conditions = { archived: false };

  Visitor.find(conditions, function (err, visitors) {
    if (err) return console.error(err);
    res.json(visitors.map(v => v.toClient()));
  })
});

/* ADD visitor */
router.post('/', function(req, res, next) {
  const visitor = new Visitor(req.body);

  visitor.save(function (err, visitor) {
    if (err) return console.error(err);
    res.json(visitor.toClient());
  });
});

/* DELETE visitor */
router.delete('/:id', function(req, res, next) {
  const conditions = { _id: req.params.id };

  Visitor.findOneAndDelete(conditions, function(err, visitor) {
    if (err) return console.error(err);
    res.json(visitor.toClient());
  });
});

/* UPDATE visitor */
router.put('/:id', function(req, res, next) {
  const conditions = { _id: req.params.id };
  const update = req.body;
  const options = { new: true };

  Visitor.findOneAndUpdate(conditions, update, options, function(err, visitor) {
    if (err) return console.error(err);
    res.json(visitor.toClient());
  });
});

module.exports = router;
