import { Link } from "react-router-dom";

const JewelryNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="card w-96 bg-base-100 shadow-xl text-center p-6">
        <div className="text-6xl">💎</div>

        <h2 className="text-2xl font-bold mt-4">
          Jewelry Not Found
        </h2>

        <p className="text-gray-500 mt-2">
          The jewelry item you are looking for does not exist.
        </p>

        <Link to="/" className="btn btn-primary mt-6">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default JewelryNotFound;