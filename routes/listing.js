const express = require("express");
const router = express.Router();

const multer = require("multer");
const {storage} = require("../cloudConfig");
const upload = multer({ storage });


const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingController = require("../controllers/listings");

// index, create route
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single("listing[image]"),validateListing, wrapAsync(listingController.createListing))

// New Route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

// show, update and delete route
router.route("/:id")
    .get(wrapAsync(listingController.showListing))

    .put(isLoggedIn, isOwner,upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))

    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing))

// Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;