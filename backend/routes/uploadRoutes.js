const express = require('express');
const router = express.Router();
const { uploadImages } = require('../controllers/uploadController');
const upload = require('../config/multer.config');

// POST /api/upload - Upload up to 10 images
router.post('/', upload.array('images', 10), uploadImages);

module.exports = router;