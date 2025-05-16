import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useVenueStore } from "../../js/store/useStore";

export default function VenueInfo() {
  const { singleVenue } = useVenueStore();
  const rating = singleVenue.rating ?? 0;
  const reviews = singleVenue.reviews?.length ?? 0;
  const host = singleVenue.owner;

  return (
    <div className="space-y-6 text-gray-800">
      {/* Location and Guests */}
      <div>
        <h2 className="text-xl font-semibold mb-2">
          {singleVenue.name} in {singleVenue.location?.city},{" "}
          {singleVenue.location?.country}
        </h2>
        <p className="text-sm sm:text-base font-medium">
          Maximum guests: {singleVenue.maxGuests}
        </p>
      </div>

      {/* Star Rating */}
      <div className="flex items-center space-x-2 text-yellow-500 text-sm">
        <FaStar />
        <span className="text-gray-700 font-medium">{rating.toFixed(1)}</span>
        <span className="text-gray-500">
          ({reviews} review{reviews !== 1 ? "s" : ""})
        </span>
      </div>

      {/* Description */}
      {singleVenue.description && (
        <div>
          <h3 className="font-semibold text-lg mb-1">Description</h3>
          <p className="text-gray-700 leading-relaxed">
            {singleVenue.description}
          </p>
        </div>
      )}

      {/* Host Info */}
      {host && (
        <div className=" p-4 [border-color:#d6e4e7] rounded-xl bg-gray-50 flex items-center space-x-4">
          {host.avatar ? (
            <img
              src={host.avatar.url}
              alt={`${host.name}'s profile`}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
              {host.name?.[0] || "?"}
            </div>
          )}

          <div>
            <h3 className="font-semibold text-sm">Hosted by</h3>
            <Link
              to={`/profile/${host.name}`}
              className="text-blue-600 hover:underline text-sm"
            >
              {host.name}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
