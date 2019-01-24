const express = require('express');
const visitorController = require('../controllers/visitor.controller');

const router = express.Router();

router.get('/', visitorController.getList);
router.post('/', visitorController.addVisitor);
router.delete('/:id', visitorController.deleteVisitor);
router.put('/:id', visitorController.updateVisitor);

module.exports = router;
