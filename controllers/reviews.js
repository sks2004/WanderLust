const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req,resp)=>{
    let{id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success","Review sent!");
    resp.redirect(`/listings/${id}`);
};

module.exports.destroyReview = async (req,resp)=>{
    let{id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull : {reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted!");
    resp.redirect(`/listings/${id}`);
};