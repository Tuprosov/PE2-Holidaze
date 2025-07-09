import { FaHeart, FaStar, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useVenueStore } from "../../js/store/useStore";
import "swiper/css";
import "swiper/css/navigation";

export default function VenueCard({ venue, isAboveFold = false }) {
  const { id, media, location, price, rating } = venue;
  const { isWishlisted } = useVenueStore();
  const hasImages = media.length > 0;

  return (
    <Link
      to={`/venue/${id}`}
      target="_blank"
      className="flex justify-center items-start"
    >
      <div className="relative bg-white z-0 rounded-xl shadow-lg overflow-hidden w-full max-w-sm">
        {/* Image Slider */}
        <div className="relative">
          {hasImages ? (
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={0}
              slidesPerView={1}
            >
              {media.map((obj, idx) => (
                <SwiperSlide key={obj.id || idx}>
                  <img
                    src={obj.url}
                    alt={obj.alt || `Venue image ${idx + 1}`}
                    loading={isAboveFold ? "eager" : "lazy"}
                    fetchpriority={isAboveFold ? "high" : "auto"}
                    className="w-full h-60 object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <img
              src="https://placehold.co/40x240?text=No+Image"
              alt="Placeholder image"
              loading={isAboveFold ? "eager" : "lazy"}
              fetchpriority={isAboveFold ? "high" : "auto"}
              className="w-full h-60 object-cover"
            />
          )}

          {/* Wishlist Button */}
          <button
            type="button"
            className="absolute z-10 top-2 right-2 bg-white p-2 rounded-full shadow-md hover:text-red-500 transition"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <FaHeart
              className={isWishlisted ? "text-red-500" : "text-gray-400"}
            />
          </button>
        </div>

        {/* Venue Info */}
        <div className="p-4 space-y-2">
          <div className="text-sm text-gray-600">
            {location.city}, {location.country}
          </div>

          <div className="flex flex-wrap items-center justify-between text-sm">
            {/* Star Rating without the number */}
            <div className="flex items-center gap-1 text-yellow-500">
              {Array.from({ length: 5 }).map((_, idx) =>
                idx < rating ? <FaStar key={idx} /> : <FaRegStar key={idx} />
              )}
            </div>
            <div className="font-semibold text-gray-800">
              NOK{price}{" "}
              <span className="text-sm font-normal text-gray-500">/ night</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
