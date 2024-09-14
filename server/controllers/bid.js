const asyncHandler = require('../middleware/async');
const errorResponse = require('../utils/errorResponse');
const successResponse = require('../utils/successResponse');
const Bid = require('../models/bid');

/**
 * @desc Get all bids
 * @route GET /api/bid/:from
 * @access Public
 */
const getBids = asyncHandler(async(req, res, next) => {
    const bidzn = await Bid.bidzn.find();
    const bidbh = await Bid.bidbh.find();
    let bids = req.params.from == "zn" ? bidzn : bidbh; 
    console.log("bids",bids);
    if(!bids)
        return next(new errorResponse('DONT HAVE bids'));
    //return successResponse(req, res, bids);
    return res.status(200).json({
        success: true,
        bids
    })
});

/**
 * @desc Get single bid
 * @route GET /api/bid/:from/:id
 * @access Public
 */
const getBid = asyncHandler(async(req, res, next) => {
    console.log("params", req.params);
    console.log("bid id ", req.params.id,req.params.from);
    const bidzn = await Bid.bidzn.findOne({id: req.params.id});
    const bidbh = await Bid.bidbh.findOne({id: req.params.id});
    if(bidzn == null && bidbh == null)
        return next(new errorResponse(`Dont have bid with id :[${req.params.id}]`));
    const bid = req.params.from == "zn" ? bidzn : bidbh;
    return res.status(200).json({
            success: true,
            bid
        })
        //return successResponse(req, res, product);
});

/**
 * @desc Create new bid
 * @route POST /api/bid/
 * @access Public
 */
const createBid = asyncHandler(async(req, res, next) => {
    console.log("create new bid", req.body)
    let bidSchema = {
        id: req.body.id,
        date: req.body.date,
        paid: req.body.paid,
        from: req.body.from,
        customer: {
            id: req.body.customer.id,
            name: req.body.customer.name,
        },
        finishPrice : req.body.finishPrice,
        date: Date.now(),
        totalPrice: req.body.totalPrice,
        vat: req.body.vat,
        discount:{
            dis: req.body.discount.dis,
            price : req.body.discount.price,
        }
    }

    let bid = (req.body.from == "zn")? await Bid.bidzn.findOne({id: bidSchema.id}) : await Bid.bidbh.findOne({id:bidSchema.id});
    console.log("bid", bid);
    if(bid)
        return next(new errorResponse(`The bid with id :[${req.body.id}] exist`));
    bid = (req.body.from == "zn") ? await Bid.bidzn.create(bidSchema) : await Bid.bidbh.create(bidSchema);
    if(!bid)
        return next(new errorResponse(`Cannot create new bid`));
    return res.status(200).json({
            success: true,
            bidSchema,
        })
        //return successResponse(req, res, productSchema);
});

/**
 * @desc Update bid
 * @route PUT /api/bid/id
 * @access Public
 */
const updateBid = asyncHandler(async(req, res, next) => {
    console.log("update bid", req.params.id);
    let bidSchema = {
        id: req.body.id,
        date: req.body.date,
        paid: req.body.paid,
        customer: req.body.customer,
        finishPrice: req.body.finishPrice,
        totalPrice: req.body.totalPrice,
        vat: req.body.vat,
        discount: req.body.discount,
        from: req.body.from,
    }
    console.log(bidSchema);
    let bid = (req.body.from == "zn")? await Bid.bidzn.findOne({id: bidSchema.id}) : await Bid.bidbh.findOne({id:bidSchema.id});
    if(!bid)
        return next(new errorResponse(`The bid with id :[${req.params.id}] is not exist`));
    bid = (req.body.from == "zn")? await Bid.bidzn.updateOne({id: bidSchema.id},bidSchema): await Bid.bidbh.updateOne({id: bidSchema.id},bidSchema);;
    if(!bid)
        return next(new errorResponse(`Cannot create new bid`));
    return res.status(200).json({
            success: true,
            bidSchema
        })
        //return successResponse(req, res, productSchema);
});

/**
 * @desc Delete bid
 * @route DELETE /api/bid/:id
 * @access Public
 */
const deleteBid = asyncHandler(async(req, res, next) => {
    let bid = req.body.from == "zn"? await Bid.bidzn.findOne({id: req.params.id}) : await Bid.bidbh.findOne({id: req.params.id});
    if(!bid)
        return next(new errorResponse(`The bid with id :[${req.params.id}] is not exist`));
    req.body.from == "zn"? 
    await Bid.bidzn.deleteOne({id: req.params.id}).then(async()=>{
        const bids = await Bid.bidzn.find();
    return res.status(200).json({
        success: true,
        bids
    });
    })
    .catch((err) =>{
        if(err)
            return next(new errorResponse('delete failed', 401));
    }): 
    
    await Bid.bidbh.deleteOne({id: req.params.id})
    .then(async()=>{
        const bids = await Bid.bidbh.find();
    return res.status(200).json({
        success: true,
        bids
    });
    })
    .catch((err) =>{
        if(err)
            return next(new errorResponse('delete failed', 401));
        })   
});

module.exports = {
    getBids, getBid, createBid, updateBid, deleteBid,
}