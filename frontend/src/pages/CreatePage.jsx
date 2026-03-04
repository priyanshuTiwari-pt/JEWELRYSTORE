import { useState } from "react";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [material, setMaterial] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const materials = ["Silver", "Gold", "Diamond"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      if (image) {
        const imageData = new FormData();
        imageData.append("image", image);

        const uploadRes = await axios.post("/jewelry/upload", imageData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        imageUrl = uploadRes.data?.url || "";
      }

      const payload = {
        name,
        price: Number(price) || 0,
        material,
        image: imageUrl,
      };

      await axios.post("/jewelry", payload);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create jewelry");
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <form
        onSubmit={handleSubmit}
        className="card bg-base-100 shadow-xl p-6 space-y-4"
      >
        <input
          type="text"
          placeholder="Jewelry Name"
          className="input input-bordered"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          className="input input-bordered"
          onChange={(e) => setPrice(e.target.value)}
        />

        <select className="select select-bordered" value={material} onChange={(e) => setMaterial(e.target.value)}>
          <option value="">Select Material</option>
          {materials.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <input
          type="file"
          className="file-input file-input-bordered"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files[0];
            setImage(f);
            setPreview(f ? URL.createObjectURL(f) : null);
          }}
        />

        {preview && (
          <div className="w-48 h-48">
            <img src={preview} alt="preview" className="w-full h-full object-cover rounded-md" />
          </div>
        )}

        <button className="btn btn-primary">Add Jewelry</button>
      </form>
    </div>
  );
};

export default CreatePage;