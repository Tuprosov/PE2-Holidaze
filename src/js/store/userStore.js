import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Auth } from "../api/auth";
import { API } from "../api/api";
import { API_HOLIDAZE_PROFILES, API_HOLIDAZE_VENUES } from "../constants";

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      isLoading: false,
      userVenues: [],
      reservations: {
        all: [],
        upcoming: [],
        past: [],
        cancelled: [],
      },
      trips: {
        upcoming: [],
        past: [],
        cancelled: [],
      },
      message: "",

      setUserVenues: (value) => set({ userVenues: value }),
      setUser: (userData) =>
        set({
          user: userData,
          isLoggedIn: true,
        }),

      clearUser: () =>
        set({
          user: null,
          userVenues: [],
          token: null,
          reservations: {
            all: [],
            upcoming: [],
            past: [],
            cancelled: [],
          },
          isLoggedIn: false,
        }),

      setReservations: (data) => {
        const allBookings = data.flatMap(
          (venue) =>
            venue.bookings?.map((booking) => ({
              ...booking,
              venueId: venue.id,
              venueName: venue.name,
            })) || []
        );

        set(() => ({
          reservations: {
            all: allBookings,
            upcoming: allBookings.filter(
              (b) => new Date(b.dateFrom) >= new Date()
            ),
            past: allBookings.filter((b) => new Date(b.dateTo) < new Date()),
            cancelled: allBookings.filter((b) => b.status === "cancelled"),
          },
        }));
      },

      setMessage: (value) => set({ message: value }),

      update: async (name, updatedData) => {
        const api = new API(API_HOLIDAZE_PROFILES);
        const data = await api.updateProfile(name, updatedData);
        get().setUser(data);
        return data;
      },

      login: async (credentials) => {
        const data = await Auth.login(credentials);
        get().setUser(data);
        set({ token: data.accessToken });
        return data;
      },

      register: async (credentials) => {
        const data = await Auth.register(credentials);
        get().setUser(data);
        return data;
      },

      logout: () => {
        Auth.logout();
        get().clearUser();
      },

      getUserTrips: async (name) => {
        set({ isLoading: true });
        const api = new API(API_HOLIDAZE_PROFILES);
        const response = await api.getUserTrips(name);
        set({ isLoading: false });

        const formattedTrips = response.data.map((trip) => ({
          ...trip,
          dateFrom: new Date(trip.dateFrom),
          dateTo: new Date(trip.dateTo),
        }));

        set({
          trips: {
            upcoming: formattedTrips.filter(
              (trip) => trip.dateFrom >= new Date()
            ),
            past: formattedTrips.filter((trip) => trip.dateTo <= new Date()),
            cancelled: response.data.cancelled || [],
          },
        });
      },

      getVenues: async (name) => {
        set({ isLoading: true });
        const api = new API(API_HOLIDAZE_PROFILES);
        const response = await api.getUserVenues(name);
        set({ userVenues: response.data, isLoading: false });
        get().setReservations(response.data);
        return response.data;
      },

      createListing: async (listingData) => {
        set({ isLoading: true });
        const api = new API(API_HOLIDAZE_VENUES);
        const response = await api.createVenue(listingData);
        set({ isLoading: false });
        return response.data;
      },

      updateListing: async (id, listingData) => {
        set({ isLoading: true });
        const api = new API(API_HOLIDAZE_VENUES);
        const response = await api.updateListing(id, listingData);
        set({ isLoading: false });
        return response.data;
      },

      deleteListing: async (id) => {
        set({ isLoading: true });
        const api = new API(API_HOLIDAZE_VENUES);
        const response = await api.deleteListing(id);
        set({ isLoading: false });
        return response.data;
      },
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isLoggedIn: state.isLoggedIn,
        userVenues: state.userVenues,
        reservations: state.reservations,
      }),
    }
  )
);
