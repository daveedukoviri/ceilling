const path = require('path');

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

module.exports = {
  uploadImages
};