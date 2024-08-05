const express = require('express');
const multer = require('multer');
const router = express.Router();
const {getBids, getBid, createBid, updateBid, deleteBid, } = require('../controllers/bid');


router.route('/').get(getBids);
router.route('/:id').get(getBid);
router.route('/').post(createBid);
router.route('/:id').put(updateBid);
router.route('/:id').delete(deleteBid);
module.exports = router;