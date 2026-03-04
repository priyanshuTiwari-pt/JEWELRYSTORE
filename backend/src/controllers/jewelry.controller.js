import Jewelry from "../models/Jewelry.model.js";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const getJewelry = async (req, res) => {
  try {
    const items = await Jewelry.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching jewelry" });
  }
};

export const getJewelryById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid product id" });
    const item = await Jewelry.findById(id);
    if (!item) return res.status(404).json({ message: "Product not found" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching product" });
  }
};

export const createJewelry = async (req, res) => {
  try {
    const item = await Jewelry.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid data for creating product", error: error.message });
  }
};

export const updateJewelry = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid product id" });
    const item = await Jewelry.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: "Product not found" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error updating product", error: error.message });
  }
};

export const deleteJewelry = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid product id" });

    

    const item = await Jewelry.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Jewelry Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error deleting product" });
  }
};

/* --- Cloudinary upload helper --- */
const uploadBufferToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

/* Controller to handle file upload via multer (memory storage) */
export const uploadImage = async (req, res) => {
  try {
    
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    
    const options = {
      folder: "e-jewel",
      resource_type: "image",
      
    };

    const result = await uploadBufferToCloudinary(req.file.buffer, options);

    
    res.json({ url: result.secure_url, public_id: result.public_id });
  } catch (error) {
    
    console.error("UploadImage error:", error);

    
    const msg = error?.message || "Image upload failed";
    res.status(500).json({ message: "Image upload failed", detail: msg });
  }
};