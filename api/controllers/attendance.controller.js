const Attendance = require('../models/attendance.model');
const Visitor = require('../models/visitor.model');

/* GET attendances list */
exports.getList = function(req, res, next) {
  Attendance.find().populate('visitors', 'name').exec(function (err, data) {
    if (err) return console.error(err);
    
    res.json(data);
  });
};

/* GET attendance by ID */
exports.getAttendanceById = function(req, res, next) {
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
    });
  });
};

/* ADD attendance */
exports.addAttendance = function(req, res, next) {
  const attendance = new Attendance(req.body);

  attendance.save(function (err, data) {
    if (err) return console.error(err);

    res.json(data);
  });
};
