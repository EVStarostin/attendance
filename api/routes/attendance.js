const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const router = express.Router();

const attendanceSchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now },
    visitors: [{ type: Schema.Types.ObjectId, ref: 'Visitor' }],
    others: { type: Number, default: 0 },
  },
  {
    toJSON: { virtuals: true },
  }
);
attendanceSchema.virtual('total').get(function () {
  return this.visitors.length + this.others;
});
const Attendance = mongoose.model('Attendance', attendanceSchema);

/* GET attendance */
router.get('/', function(req, res, next) {
  Attendance.find().
  populate('visitors', 'name').
  exec(function (err, data) {
    if (err) return console.error(err);
    res.json(data);
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
  const conditions = { _id: req.params.id };

  Visitor.findOneAndDelete(conditions, function(err, visitor) {
    if (err) return console.error(err);
    res.json(visitor);
  });
});

/* UPDATE visitor */
router.put('/:id', function(req, res, next) {
  const conditions = { _id: req.params.id };
  const update = req.body;
  const options = { new: true };

  Visitor.findOneAndUpdate(conditions, update, options, function(err, visitor) {
    if (err) return console.error(err);
    res.json(visitor);
  });
});

module.exports = router;
