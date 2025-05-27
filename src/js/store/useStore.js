import { create } from "zustand";
import {
  API_HOLIDAZE_VENUES,
  API_HOLIDAZE_BOOKINGS,
  API_HOLIDAZE_PROFILES,
} from "../constants";
import { API } from "../api/api";

export const useSearchStore = create((set) => ({
  showLocation: false,
  showCalendar: false,
  showGuests: false,
  showSearchBar: false,
  showSuggestions: false,
  searchQuery: "",

  setShowLocation: (value) => set({ showLocation: value }),
  setShowCalendar: (value) => set({ showCalendar: value }),
  setShowGuests: (value) => set({ showGuests: value }),
  setShowSuggestions: (value) => set({ showSuggestions: value }),
  toggleSearchBar: () =>
    set((state) => ({ showSearchBar: !state.showSearchBar })),
  setSearchQuery: (query) =>
    set((state) => ({
      searchQuery: {
        ...state.searchQuery,
        ...query,
      },
    })),
}));

export const useDateStore = create((set) => ({
  checkIn: null,
  checkOut: null,

  setCheckIn: (date) => set({ checkIn: date }),
  setCheckOut: (date) => set({ checkOut: date }),
}));

export const useGuestStore = create((set, get) => ({
  adults: 0,
  children: 0,
  infants: 0,
  pets: 0,
  total: 0,

  updateTotal: () => {
    const { adults, children, infants } = get();
    const total = adults + children + infants;
    set({ total });
  },

  increment: (type) => {
    set((state) => ({ [type]: state[type] + 1 }));
    get().updateTotal();
  },

  decrement: (type) => {
    set((state) => ({ [type]: Math.max(0, state[type] - 1) }));
    get().updateTotal();
  },

  setCount: (type, count) => {
    set(() => ({ [type]: count }));
    get().updateTotal();
  },

  resetGuests: () => {
    set({
      adults: 0,
      children: 0,
      infants: 0,
      pets: 0,
      total: 0,
    });
  },
}));

export const useVenueStore = create((set) => ({
  venues: [],
  singleVenue: {},
  originalVenues: [],
  loading: false,
  error: null,
  isWishlisted: false,
  bookings: [],
  setBookings: (bookings) => set({ bookings }),
  setIsWishlisted: (state) => set({ isWishlisted: !state.isWishlisted }),
  setVenues: (value) => {
    set({ venues: value });
  },
  fetchVenues: async () => {
    set({ loading: true, error: null });
    const api = new API(API_HOLIDAZE_VENUES);
    try {
      const response = await api.getVenues(API_HOLIDAZE_VENUES);
      set({ originalVenues: response.data });
      set({ venues: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchVenue: async (id) => {
    set({ loading: true, error: null });
    const api = new API(API_HOLIDAZE_VENUES);
    try {
      const response = await api.getVenue(id);
      set({ singleVenue: response.data, loading: false });
      set({
        bookings: response.data.bookings
          .map((booking) => ({
            from: new Date(booking.dateFrom),
            to: new Date(booking.dateTo),
          }))
          .sort((a, b) => a.from - b.from),
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export const useLocationStore = create((set) => ({
  location: "",
  locationSuggestions: [],
  setLocationSuggestions: (suggestions) => {
    set({ locationSuggestions: suggestions });
  },
  setLocation: (location) => set({ location }),
  resetLocation: () => set({ location: "" }),
}));

export const useBookingStore = create((set) => ({
  booking: {
    dateFrom: null,
    dateTo: null,
    guests: 0,
    venueId: null,
  },
  totalPrice: 0,

  setTotalPrice: (price) => set({ totalPrice: price }),

  setBooking: (update) =>
    set((state) => ({
      booking: {
        ...state.booking,
        ...update,
      },
    })),

  bookVenue: async (booking) => {
    const api = new API(API_HOLIDAZE_BOOKINGS);
    const response = await api.bookVenue(booking);
  },
}));
