const Listing = require('../models/listing.js');
const Review = require('../models/review.js');

module.exports.addReview = async (req, res) => {
    let { id } = req.params;
    let newReview = new Review(req.body.review);

    // 1. Assign the logged-in user as the review author
    newReview.author = req.user._id;
    await newReview.save();

    // 2. FIXED: Use findByIdAndUpdate to push the review ID without triggering full listing validation
    await Listing.findByIdAndUpdate(id, { $push: { reviews: newReview._id } });
    
    req.flash('success', 'New review added! Thank you for sharing your experience with us.');
    res.redirect(`/listings/${id}`);
}

module.exports.deleteReview = async (req, res) => {
    let { id , reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash('success', 'Success! The review has been permanently deleted from this listing.');
    res.redirect(`/listings/${id}`);
}