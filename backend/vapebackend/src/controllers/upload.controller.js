exports.uploadImage = (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.json({
      message: "File uploaded ✅",
      file: req.file.filename
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err.message);
    next(err);
  }
};