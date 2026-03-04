import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../lib/axios";
import JewelryCard from "../components/JewelryCard";
import toast from "react-hot-toast";


const HomePage = () => {
  const [jewelry, setJewelry] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [material, setMaterial] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [alphabetSort, setAlphabetSort] = useState("");
  const location = useLocation();
  const q = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    axios.get("/jewelry").then((res) => {
      setJewelry(res.data);
      setFiltered(res.data);
    });
  }, []);

  useEffect(() => {
    const qLower = q.toLowerCase();
    let list = [...jewelry];
    if (qLower) list = list.filter((i) => i.name.toLowerCase().includes(qLower));
    if (material) list = list.filter((i) => (i.material || "").toLowerCase() === material.toLowerCase());
    
    // Sort by alphabet
    if (alphabetSort === "asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (alphabetSort === "desc") {
      list.sort((a, b) => b.name.localeCompare(a.name));
    }
    
    // Sort by price
    if (priceSort === "low") {
      list.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (priceSort === "high") {
      list.sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    
    setFiltered(list);
  }, [q, material, jewelry, priceSort, alphabetSort]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this item?")) return;
    try {
      await axios.delete(`/jewelry/${id}`);
      setJewelry((prev) => prev.filter((p) => p._id !== id));
      toast.success("Deleted");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  const materials = ["Silver", "Gold", "Diamond"];

  return (
    <div>
      <div className="mb-4 flex items-center gap-4 flex-wrap">
        <select className="select select-bordered w-48" value={material} onChange={(e) => setMaterial(e.target.value)}>
          <option value="">All materials</option>
          {materials.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        
        <select className="select select-bordered w-48" value={priceSort} onChange={(e) => setPriceSort(e.target.value)}>
          <option value="">Sort by Price</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
        
        <select className="select select-bordered w-48" value={alphabetSort} onChange={(e) => setAlphabetSort(e.target.value)}>
          <option value="">Sort by Name</option>
          <option value="asc">A to Z</option>
          <option value="desc">Z to A</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <JewelryCard key={item._id} jewelry={item} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;