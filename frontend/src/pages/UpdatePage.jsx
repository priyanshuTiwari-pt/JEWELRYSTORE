import { useState, useEffect } from "react";
import axios from "../lib/axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UpdatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [material, setMaterial] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  const materials = ["Silver", "Gold", "Diamond"];

  useEffect(() => {
    const fetchJewelry = async () => {
      try {
        const res = await axios.get(`/jewelry/${id}`);
        setName(res.data.name || "");
        setPrice(res.data.price || "");
        setMaterial(res.data.material || "");
        setDescription(res.data.description || "");
        setPreview(res.data.image || null);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load jewelry");
        navigate("/");
      }
    };
    fetchJewelry();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = preview;

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
        description,
        image: imageUrl,
      };

      await axios.put(`/jewelry/${id}`, payload);
      toast.success("Jewelry updated successfully");
      navigate(`/jewelry/${id}`);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update jewelry");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-lg mx-auto">
      <form
        onSubmit={handleSubmit}
        className="card bg-base-100 shadow-xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4">Update Jewelry</h2>

        <input
          type="text"
          placeholder="Jewelry Name"
          className="input input-bordered"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="input input-bordered"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <select className="select select-bordered" value={material} onChange={(e) => setMaterial(e.target.value)}>
          <option value="">Select Material</option>
          {materials.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <textarea
          placeholder="Description"
          className="textarea textarea-bordered"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        />

        <input
          type="file"
          className="file-input file-input-bordered"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files[0];
            setImage(f);
            setPreview(f ? URL.createObjectURL(f) : preview);
          }}
        />

        {preview && (
          <div className="w-48 h-48">
            <img src={preview} alt="preview" className="w-full h-full object-cover rounded-md" />
          </div>
        )}

        <div className="flex gap-2">
          <button className="btn btn-primary flex-1">Update Jewelry</button>
          <button type="button" onClick={() => navigate("/")} className="btn btn-ghost">Back</button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePage;
