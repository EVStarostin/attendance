const express = require('express');
const attendanceController = require('../controllers/attendance.controller');

const router = express.Router();

router.get('/', attendanceController.getList);
router.get('/:id', attendanceController.getAttendanceById);
router.post('/', attendanceController.addAttendance);

module.exports = router;
