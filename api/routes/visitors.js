const express = require('express');
const router = express.Router();

const Visitor = require('../models/visitor.model');

/* GET visitors list */
router.get('/', function(req, res, next) {
  const conditions = { archived: false };

  Visitor.find(conditions, function (err, visitors) {
    if (err) return console.error(err);

    res.json(visitors);
  })
});

/* ADD visitor */
router.post('/', function(req, res, next) {
  const visitor = new Visitor(req.body);

  visitor.save(function (err, visitor) {
    if (err) return console.error(err);

    res.json(visitor);
  });
});

/* DELETE visitor */
router.delete('/:id', function(req, res, next) {
  Visitor.findByIdAndDelete(req.params.id, function(err, visitor) {
    if (err) return console.error(err);

    res.json(visitor);
  });
});

/* UPDATE visitor */
router.put('/:id', function(req, res, next) {
  const options = { new: true };

  Visitor.findByIdAndUpdate(req.params.id, req.body, options, function(err, visitor) {
    if (err) return console.error(err);

    res.json(visitor);
  });
});

module.exports = router;
