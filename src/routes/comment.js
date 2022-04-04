const router = require('express').Router();
const commentController = require('../controllers/commentController');

router.get('/:id',commentController.getComments);

module.exports = router;