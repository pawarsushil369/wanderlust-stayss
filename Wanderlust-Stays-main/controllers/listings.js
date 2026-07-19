const Listing = require('../models/listing.js');
const getGeoData = require('../utils/geoData.js');

// ==========================================
// 1. DISPLAY ALL LISTINGS (INDEX & FILTERS)
// ==========================================
module.exports.index = async (req, res) => {
    // Clean up query inputs by removing any accidental whitespace strings
    let category = req.query.category ? req.query.category.trim() : undefined;
    let location = req.query.location ? req.query.location.trim() : undefined;
    
    let query = {};
    
    // If a category filter button is clicked, prioritize it immediately
    if (category) {
        query.category = category;
        
    // Only run location text searches if the location string isn't empty ""
    } else if (location && location !== "") {
        const searchWords = location.split(" ");

        const allQueries = searchWords.map(word => ({
            $or: [
                { location: new RegExp(word, 'i') },
                { country: new RegExp(word, 'i') },
                { title: new RegExp(word, 'i') } // Fallback helper to search by title text too!
            ]
        }));

        query.$or = allQueries;
    }
    
    const allListings = await Listing.find(query);
    
    // Handle flash messages cleanly depending on whether it was a Search or a Filter click
    if (allListings.length === 0) {
        if (location) {
            req.flash('warning', `We couldn't find any listings matching "${location}". Try another search!`);
        } else if (category) {
            req.flash('warning', `There are currently no properties listed under "${category}".`);
        }
        return res.redirect('/listings');
    }
    
    res.render("listings/index", { allListings, selectedCategory: category });
}

// ==========================================
// 2. RENDER NEW LISTING FORM
// ==========================================
module.exports.newListing = (req, res) => {
    res.render('listings/new');
}

// ==========================================
// 3. CREATE NEW LISTING
// ==========================================
module.exports.createListing = async (req, res) => {
    let listing = req.body.listing;
    let geometry = await getGeoData(listing.location, listing.country);

    if (!geometry) {
        req.flash('error', 'Location not found! Please check the spelling or Country.');
        return res.redirect('/listings/new');
    }

    if (!req.file) {
        req.flash('error', 'Please upload a listing image.');
        return res.redirect('/listings/new');
    }

    let imageUrl = req.file.path;
    let imageFilename = req.file.filename;

    const newListing = new Listing(listing);
    newListing.owner = req.user._id;
    newListing.image = { url: imageUrl, filename: imageFilename };
    newListing.geometry = geometry;
    
    await newListing.save();
    req.flash('success', 'New listing created! It is now live and visible to everyone.');
    res.redirect('/listings');
}

// ==========================================
// 4. SHOW SINGLE LISTING DETAILS
// ==========================================
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author',
            },
        })
        .populate('owner');

    if (!listing) {
        req.flash('error', 'Error! The listing you requested does not exist or was deleted.');
        return res.redirect('/listings');
    }
    
    res.render('listings/show', { listing });
}

// ==========================================
// 5. RENDER EDIT LISTING FORM
// ==========================================
module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
        req.flash('error', 'Error! The listing you requested does not exist or was deleted.');
        return res.redirect('/listings');
    }

    res.render('listings/edit', { listing });
}

// ==========================================
// 6. UPDATE EXISTING LISTING
// ==========================================
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = req.body.listing;
    let existingListing = await Listing.findById(id);

    if (!existingListing) {
        req.flash('error', 'Error! The listing you requested does not exist.');
        return res.redirect('/listings');
    }

    // Only recall geocoding API if the location or country fields were actually altered
    if (
        existingListing.location !== listing.location ||
        existingListing.country !== listing.country
    ) {
        let geometry = await getGeoData(listing.location, listing.country);

        if (!geometry) {
            req.flash('error', 'Location not found! Please check the spelling or Country.');
            return res.redirect(`/listings/${id}/edit`);
        }

        listing.geometry = geometry;
    }
    
    // If a new image file was provided via the edit upload form
    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
    }

    await Listing.findByIdAndUpdate(id, { ...listing }, { new: true } );

    req.flash('success', 'Listing updated! Your latest changes are now live on the website.');
    res.redirect(`/listings/${id}`);
}

// ==========================================
// 7. DELETE A LISTING
// ==========================================
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success', 'Listing deleted! It has been successfully removed from your collection.');
    res.redirect('/listings');
}