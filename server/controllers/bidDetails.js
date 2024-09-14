const asyncHandler = require('../middleware/async');
const errorResponse = require('../utils/errorResponse');
const successResponse = require('../utils/successResponse');
const BidDetail = require('../models/bidDetails');

/**
 * @desc Get all BidDetails
 * @route GET /api/bidDetail/:from
 * @access Public
 */
const getBidDetails = asyncHandler(async(req, res, next) => {
    const bidDetails = await BidDetail.find({from: req.params.from});
    if(!bidDetails)
        return next(new errorResponse('DONT HAVE BidDetails'));
    //return successResponse(req, res, BidDetails);
    return res.status(200).json({
        success: true,
        bidDetails
    })
});

/**
 * @desc Get single BidDetail
 * @route GET /api/bidDetail/:id
 * @access Public
 */
const getBidDetail = asyncHandler(async(req, res, next) => {
    const bidDetail = await BidDetail.find({idBid: req.params.id,from: req.params.from});
    if(bidDetail == null)
        return next(new errorResponse(`Dont have BidDetail with id :[${req.params.id}]`));
    return res.status(200).json({
            success: true,
            bidDetail
        })
        //return successResponse(req, res, product);
});

/**
 * @desc Create new BidDetail
 * @route POST /api/bidDetail/
 * @access Public
 */
const createBidDetail = asyncHandler(async(req, res, next) => {
    const Product = require("./../models/product");
    const product = (req.body.from == "zn")? await Product.productzn.findById(req.body.idProduct) : await Product.productbh.findById(req.body.idProduct);
    if(!product) {
        return next(new errorResponse(`The Product with id :[${req.body.idProduct}] is not exist`));
    }
    let bidDetailSchema = {
        idBid: req.body.idBid,
        idProduct: req.body.idProduct, 
        amount: req.body.amount ,
        TotalPrice: (parseInt(product.price) * parseInt(req.body.amount)).toString(),
        from: req.body.from,
    }

    let bidDetail = await BidDetail.findOne({idBid: bidDetailSchema.idBid, idProduct: bidDetailSchema.idProduct});
    if(bidDetail)
        return next(new errorResponse(`The BidDetail with same details is  exist`));
    bidDetail = await BidDetail.create(req.body);
    if(!bidDetail)
        return next(new errorResponse(`Cannot create new BidDetail`));
    return res.status(200).json({
            success: true,
            bidDetailSchema,
        })
        //return successResponse(req, res, productSchema);
});

/**
 * @desc Update BidDetail
 * @route PUT /api/bidDetail/:id
 * @access Public
 */
const updateBidDetail = asyncHandler(async(req, res, next) => {
    let bidDetailSchema = {
        idBid: req.body.idBid,
        idProduct: req.body.idProduct, 
        amount: req.body.amount ,
        TotalPrice: (parseInt(product.price) * parseInt(req.body.amount)).toString(),
        from: req.body.from,
    }
    let bidDetail = await BidDetail.findOne({idBid: bidDetailSchema.idBid, idProduct: bidDetailSchema.idProduct});
    if(!bidDetail)
        return next(new errorResponse(`The BidDetail with same details is not exist`));
    bidDetail = await BidDetail.updateOne({idBid: bidDetailSchema.idBid, idProduct: bidDetailSchema.idProduct},bidDetailSchema);
    if(!bidDetail)
        return next(new errorResponse(`Cannot create new BidDetail`));
    return res.status(200).json({
            success: true,
            bidDetailSchema
        })
        //return successResponse(req, res, productSchema);
});

/**
 * @desc Delete BidDetail
 * @route DELETE /api/bidDetail//:from/:id
 * @access Public
 */
const deleteBidDetail = asyncHandler(async(req, res, next) => {
    let bidDetail = await BidDetail.findOne({idBid: req.params.id, from: req.params.from});
    if(!bidDetail)
        return next(new errorResponse(`The BidDetail with id :[${req.params.id}] is not exist`));
    await BidDetail.deleteMany({idBid: req.params.id, from: req.body.from})
    .then(async()=>{
        const bidDetails = await BidDetail.find();
    return res.status(200).json({
        success: true,
        bidDetails
    });
    })
    .catch((err) =>{
        if(err)
            return next(new errorResponse('delete failed', 401));
        })   
});

module.exports = {
    getBidDetails, getBidDetail, createBidDetail, updateBidDetail, deleteBidDetail,
}