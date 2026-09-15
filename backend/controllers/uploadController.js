
const uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Tidak ada file gambar yang diunggah.' });
    }

    const imageUrl = `/images/uploads/${req.file.filename}`;

    res.status(201).json({
      success: true,
      message: 'Gambar berhasil diunggah.',
      data: {
        image_url: imageUrl,
        filename: req.file.filename
      }
    });
  } catch (error) {
    console.error('UploadImage error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server saat mengunggah gambar.' });
  }
};

const uploadDocument = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Tidak ada file yang diunggah.' });
    }

    const fileUrl = `/documents/${req.file.filename}`;

    res.status(201).json({
      success: true,
      message: 'Dokumen berhasil diunggah.',
      data: {
        file_url: fileUrl,
        filename: req.file.filename,
        original_name: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      }
    });
  } catch (error) {
    console.error('UploadDocument error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server saat mengunggah dokumen.' });
  }
};

module.exports = { uploadImage, uploadDocument };
