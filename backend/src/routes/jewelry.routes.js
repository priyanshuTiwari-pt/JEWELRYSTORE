import express from "express";
import multer from "multer";
import {
  getJewelry,
  getJewelryById,
  createJewelry,
  updateJewelry,
  deleteJewelry,
  uploadImage
} from "../controllers/jewelry.controller.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});


router.post("/upload", upload.single("image"), uploadImage);

router.get("/", getJewelry);
router.post("/", createJewelry);
router.put("/:id", updateJewelry);
router.delete("/:id", deleteJewelry);
router.get("/:id", getJewelryById);
export default router;