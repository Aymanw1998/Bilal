const express = require('express');
const multer = require('multer');
const router = express.Router();
const {getBidDetails, getBidDetail, createBidDetail, updateBidDetail, deleteBidDetail, } = require('../controllers/bidDetails');


router.route('/:from').get(getBidDetails);
router.route('/:from/:id').get(getBidDetail);
router.route('/').post(createBidDetail);
router.route('/:id').put(updateBidDetail);
router.route('/:from/:id').delete(deleteBidDetail);
module.exports = router;