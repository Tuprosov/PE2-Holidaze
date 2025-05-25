import { useVenueStore, useBookingStore } from "../js/store/useStore";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Images from "../components/venuePage/Images";
import VenueInfo from "../components/venuePage/VenueInfo";
import BookingForm from "../components/venuePage/BookingForm";
import Amenities from "../components/venuePage/Amenities";

export default function VenuePage() {
  const { fetchVenue, singleVenue, loading } = useVenueStore();
  const { setBooking } = useBookingStore();
  const { id } = useParams();

  useEffect(() => {
    fetchVenue(id);
    setBooking({ venueId: id });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-10">
        <h1 id="venueTitle" className="font-semibold max-w-xl mb-6">
          {singleVenue.name}
        </h1>
        <Images />
      </div>
      <div className="flex flex-col justify-between lg:flex-row gap-8">
        <div className="w-full lg:w-1/2 space-y-6">
          <VenueInfo />
          <Amenities />
        </div>
        <div className="w-full lg:w-1/3">
          <BookingForm />
        </div>
      </div>
    </>
  );
}
