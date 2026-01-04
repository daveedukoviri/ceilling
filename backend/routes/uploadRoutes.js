// routes/uploadRoutes.js

const express = require('express');
const router = express.Router();
const { uploadImages, getAllImages } = require('../controllers/uploadController');
const upload = require('../config/multer.config');

// POST - Upload images
router.post('/', upload.array('images', 10), uploadImages);

// GET - Fetch all uploaded images
router.get('/', getAllImages);

module.exports = router;