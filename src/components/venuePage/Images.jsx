import { useVenueStore } from "../../js/store/useStore";

export default function Images() {
  const { singleVenue } = useVenueStore();
  const media = singleVenue.media || [];

  const placeholder = "https://placehold.co/40x240?text=No+Image";

  // Ensure there are 5 images total: 1 main + 4 others
  const imagesToShow = [...media];

  while (imagesToShow.length < 5) {
    imagesToShow.push({ url: placeholder, alt: "Placeholder" });
  }

  return (
    <div className="w-full grid grid-cols-4 grid-rows-2 gap-2 h-[600px] overflow-hidden rounded-2xl">
      {/* 1 main image */}
      <div className="col-span-2 row-span-2">
        <img
          src={imagesToShow[0].url}
          alt="Main venue"
          className="w-full h-full object-cover rounded-l-2xl"
        />
      </div>

      {/* 4 images */}
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
  );
}
