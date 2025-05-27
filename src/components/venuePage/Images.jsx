import { useVenueStore } from "../../js/store/useStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Images() {
  const { singleVenue } = useVenueStore();
  const media = singleVenue.media || [];

  const placeholder = "https://placehold.co/40x240?text=No+Image";

  // there are 5 images total: 1 main + 4 others
  const imagesToShow = [...media];

  while (imagesToShow.length < 5) {
    imagesToShow.push({ url: placeholder, alt: "Placeholder" });
  }

  return (
    <>
      {/* Desktop grid layout (shown on sm and up) */}
      <div className="hidden sm:grid w-full grid-cols-4 grid-rows-2 gap-2 aspect-[4/3] lg:aspect-[16/9] overflow-hidden rounded-2xl">
        {/* Main image */}
        <div className="col-span-2 row-span-2">
          <img
            src={imagesToShow[0].url}
            alt="Main venue"
            className="w-full h-full object-cover rounded-l-2xl"
          />
        </div>

        {/* 4 small images */}
        {imagesToShow.slice(1, 5).map((image, idx) => (
          <div key={idx} className="col-span-1 row-span-1">
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Mobile slider (shown below sm) */}
      <div className="sm:hidden">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
        >
          {imagesToShow.map((image, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-[300px] object-cover rounded-2xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
