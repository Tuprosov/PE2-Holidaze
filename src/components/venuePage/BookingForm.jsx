import {
  useSearchStore,
  useGuestStore,
  useDateStore,
  useBookingStore,
  useVenueStore,
} from "../../js/store/useStore";
import { useUserStore } from "../../js/store/userStore";
import DatePicker from "../global/DatePicker";
import AddGuests from "../global/AddGuests";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function BookingForm() {
  const { checkIn, checkOut } = useDateStore();
  const { total, pets } = useGuestStore();
  const { showCalendar, setShowCalendar, showGuests, setShowGuests } =
    useSearchStore();
  const { bookVenue, booking } = useBookingStore();
  const { isLoggedIn, message, setMessage } = useUserStore();
  const navigate = useNavigate();

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (booking?.dateFrom && booking?.dateTo && booking?.guests) {
      try {
        await bookVenue(booking);
        setMessage("Booking successfull!");
      } catch (error) {
        setMessage(error.message || "Something went wrong");
      }
    }
  };

  if (message) return <DisplaySuccessMessage message={message} />;

  return (
    <form
      onSubmit={handleBookingSubmit}
      className="flex flex-col gap-6 p-6 mb-6 bg-white shadow-xl rounded-2xl border [border-color:#d6e4e7] sticky top-20"
    >
      <h2 className="text-xl font-semibold">Book this venue</h2>
      {/* Dates */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Dates
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            className="shadow-md hover:bg-gray-50 rounded-lg p-3 text-left"
            onClick={() => {
              setShowCalendar(!showCalendar);
              setShowGuests(false);
            }}
          >
            <div className="text-gray-500 text-xs">Check In</div>
            <div>{checkIn ? format(checkIn, "dd MMM") : "Add date"}</div>
          </button>
          <button
            type="button"
            className="shadow-md hover:bg-gray-50 rounded-lg p-3 text-left"
            onClick={() => {
              setShowCalendar(!showCalendar);
              setShowGuests(false);
            }}
          >
            <div className="text-gray-500 text-xs">Check Out</div>
            <div>{checkOut ? format(checkOut, "dd MMM") : "Add date"}</div>
          </button>
        </div>

        <div className="absolute md:min-w-[700px] right-0 z-10">
          {showCalendar && <DatePicker isBooking={true} />}
        </div>
      </div>

      {/* Guests */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Guests
        </label>
        <button
          type="button"
          onClick={() => {
            setShowGuests(!showGuests);
            setShowCalendar(false);
          }}
          className="shadow-md hover:bg-gray-50 rounded-lg p-3 text-left w-full"
        >
          <div className="text-gray-500 text-xs">Guests</div>
          <div>
            {total
              ? `${total} guests${pets ? `, ${pets} pets` : ""}`
              : "Add guests"}
          </div>
        </button>
        <div className="absolute w-full z-10">
          {showGuests && <AddGuests isBooking={true} />}
        </div>
      </div>
      {/* Booking Details */}
      {booking?.dateFrom && booking?.dateTo && <BookingDetails />}
      {/* Submit */}
      {isLoggedIn ? (
        <button
          type="submit"
          id="book-button"
          className="text-white font-semibold p-4 rounded-lg transition"
        >
          Book now
        </button>
      ) : (
        <p className="text-sm text-red-500 text-center">
          You need to be logged in to book a venue.{" "}
          <button className="underline w-28" onClick={() => navigate("/auth")}>
            Login
          </button>
        </p>
      )}
    </form>
  );
}

function BookingDetails() {
  const { booking, totalPrice } = useBookingStore();
  const { singleVenue } = useVenueStore();

  const dateFrom = new Date(booking.dateFrom);
  const dateTo = new Date(booking.dateTo);
  const nights = (dateTo - dateFrom) / (1000 * 3600 * 24); // days between

  // price breakdown component
  return (
    <div className="bg-white rounded-lg space-y-4 max-w-sm mx-auto">
      <h2 className="text-lg font-semibold">Price Breakdown</h2>

      <div className="flex justify-between text-sm">
        <span className="font-medium">Guests:</span>
        <span>{booking.guests}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="font-medium">Price per night:</span>
        <span>{singleVenue?.price} NOK</span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="font-medium">Nights:</span>
        <span>{nights}</span>
      </div>

      <div className="flex justify-between text-sm font-semibold">
        <span className="font-medium">Total:</span>
        <span>{totalPrice} NOK</span>
      </div>
    </div>
  );
}

function DisplaySuccessMessage({ message }) {
  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
      <strong className="font-bold">Success!</strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
}
