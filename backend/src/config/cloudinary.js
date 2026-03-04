import 'dotenv/config'; 
import cloudinary from "cloudinary";

const { CLOUDINARY_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

const mask = (val) => (val ? `${val.toString().slice(0, 4)}...` : "missing");

if (CLOUDINARY_URL) {
  console.log("Cloudinary: using CLOUDINARY_URL (present).");
  } else {
  console.log(
    "Cloudinary env:",
    "cloud_name:", CLOUDINARY_CLOUD_NAME ? "set" : "missing",
    "api_key:", CLOUDINARY_API_KEY ? "set" : "missing",
    "api_secret:", CLOUDINARY_API_SECRET ? "set" : "missing"
  );
}

if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
  cloudinary.v2.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
} else if (CLOUDINARY_URL) {
  
  try {
    cloudinary.v2.config(); 
  } catch (err) {
    console.error("Cloudinary: failed to configure from CLOUDINARY_URL:", err.message);
  }
} else {
  console.warn(
    "Cloudinary is not configured. Set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME/CLOUDINARY_API_KEY/CLOUDINARY_API_SECRET in backend/.env"
  );
}

export default cloudinary.v2;