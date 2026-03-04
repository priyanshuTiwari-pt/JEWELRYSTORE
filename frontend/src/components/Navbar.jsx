import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const qParam = params.get("q") || "";

  const [query, setQuery] = useState(qParam);

  useEffect(() => setQuery(qParam), [qParam]);

  const onSearch = (val) => {
    const s = new URLSearchParams();
    if (val) s.set("q", val);
    navigate({ pathname: "/", search: s.toString() });
  };

  return (
    <div className="navbar bg-base-200 px-6">
      <Link to="/" className="text-2xl font-bold">
        💎 E-Jewel
      </Link>

      <div className="flex items-center gap-3 ml-4">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="Search jewelry..."
          className="input input-sm input-bordered"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <Link to="/create" className="btn btn-primary">
          Add Jewelry
        </Link>
      </div>
    </div>
  );
};

export default Navbar;