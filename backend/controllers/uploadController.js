// controllers/uploadController.js

const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads');

const uploadImages = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid images were uploaded.'
      });
    }

    const uploadedFiles = files.map(file => ({
      originalName: file.originalname,
      filename: file.filename,
      size: file.size,
      url: `/uploads/${file.filename}`
    }));

    res.status(200).json({
      success: true,
      message: `Successfully uploaded ${files.length} image(s)`,
      count: files.length,
      files: uploadedFiles
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Upload failed'
    });
  }
};

// NEW: Get all uploaded images
const getAllImages = (req, res) => {
  try {
    if (!fs.existsSync(uploadDir)) {
      return res.status(200).json({
        success: true,
        count: 0,
        images: []
      });
    }

    const files = fs.readdirSync(uploadDir);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });

    const images = imageFiles.map(filename => ({
      filename,
      url: `/uploads/${filename}`,
      // Optional: add timestamp or size if needed
    }));

    res.status(200).json({
      success: true,
      count: images.length,
      images
    });

  } catch (error) {
    console.error('Error reading uploads:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch images'
    });
  }
};

module.exports = {
  uploadImages,
  getAllImages  // ← Export this
};