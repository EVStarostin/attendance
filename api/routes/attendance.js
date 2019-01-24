const express = require('express');
const router = express.Router();

const Attendance = require('../models/attendance.model');
const Visitor = require('../models/visitor.model');

/* GET attendances list */
router.get('/', function(req, res, next) {
  Attendance.find().populate('visitors', 'name').exec(function (err, data) {
    if (err) return console.error(err);
    
    res.json(data);
  })
});


/* GET attendance by ID */
router.get('/:id', function(req, res, next) {
  Visitor.find({ archived: false }, 'name', function(err, visitors) {
    if (err) return console.error(err);

    Attendance.findById(req.params.id, function (err, data) {
      if (err) return console.error(err);
      
      const enrichedVisitors = visitors.map(visitor => {
        return { 
          ...visitor.toJSON(),
          present: data.visitors.indexOf(visitor._id) !== -1
        };
      });

      res.json({ 
        ...data.toJSON(),
        visitors: enrichedVisitors
      });
    })
  })
});

/* ADD attendance */
router.post('/', function(req, res, next) {
  const attendance = new Attendance(req.body);

  attendance.save(function (err, data) {
    if (err) return console.error(err);

    res.json(data);
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
