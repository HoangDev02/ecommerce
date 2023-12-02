const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const bannerController = require("../app/controller/bannerController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'banners/') // Thư mục lưu trữ tập tin
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});
const uploadBanner = multer({ storage: storage });

router.post(
  '/create',
  uploadBanner.array('images', 3),
  bannerController.createBanner
);
router.get(
  '/',
  bannerController.getBanner
);

module.exports = router;
