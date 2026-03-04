import { Link } from "react-router-dom";
import { formatCurrency, formatDate } from "../lib/utils";

const JewelryCard = ({ jewelry, onDelete }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={jewelry.image}
          alt={jewelry.name}
          className="h-60 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{jewelry.name}</h2>
        <p>{formatCurrency(jewelry.price)}</p>
        <p className="text-xs text-gray-500">Added: {formatDate(jewelry.createdAt)}</p>

        <div className="card-actions">
          <Link to={`/jewelry/${jewelry._id}`} className="btn btn-outline btn-sm">
            View
          </Link>
          {onDelete && (
            <button
              onClick={() => onDelete(jewelry._id)}
              className="btn btn-error btn-sm"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JewelryCard;