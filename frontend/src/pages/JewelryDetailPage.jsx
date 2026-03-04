import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import { formatCurrency, formatDate } from "../lib/utils";

const JewelryDetailPage = () => {
  const { id } = useParams();
  const [jewelry, setJewelry] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/jewelry/${id}`).then((res) => setJewelry(res.data));
  }, [id]);

  if (!jewelry) return <div>Loading...</div>;
  const handleDelete = async () => {
    if (!confirm("Delete this jewelry?")) return;
    try {
      await axios.delete(`/jewelry/${id}`);
      toast.success("Deleted");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl max-w-xl mx-auto">
      <figure>
        <img src={jewelry.image} alt={jewelry.name} className="w-full h-96 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{jewelry.name}</h2>
        <p className="text-lg font-medium">{formatCurrency(jewelry.price)}</p>
        <p className="text-sm text-gray-500">{jewelry.material}</p>
        <p className="text-xs text-gray-500">Created: {formatDate(jewelry.createdAt)}</p>
        {jewelry.updatedAt && (
          <p className="text-xs text-gray-500">Updated: {formatDate(jewelry.updatedAt)}</p>
        )}
        <p className="mt-2">{jewelry.description}</p>

        <div className="card-actions mt-4 gap-2">
          <button onClick={() => navigate(`/update/${id}`)} className="btn btn-primary">Edit</button>
          <button onClick={handleDelete} className="btn btn-error">Delete</button>
          <button onClick={() => navigate("/")} className="btn btn-ghost">Back</button>
        </div>
      </div>
    </div>
  );
};

export default JewelryDetailPage;