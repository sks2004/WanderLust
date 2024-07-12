const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError");
const {listingSchema} = require("./schema");
const {reviewSchema} = require("./schema");
const Review = require("./models/review");

module.exports.isLoggedIn = (req,resp,next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in!");
        return resp.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,resp,next) => {
    if(req.session.redirectUrl){
        resp.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.validateListing = (req,resp,next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
};

module.exports.validateReview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
};

module.exports.isOwner = async (req,resp,next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(resp.locals.currUser._id)){
        req.flash("error","You are not the owner of this listing!");
        return resp.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req,resp,next) => {
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(resp.locals.currUser._id)){
        req.flash("error","You are not the author of this review!");
        return resp.redirect(`/listings/${id}`);
    }
    next();
}