import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Auth } from "../api/auth";
import { API } from "../api/api";
import { API_HOLIDAZE_PROFILES } from "../constants";

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      hostMode: false,
      isLoading: true,
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

      getUserTrips: async (name) => {
        const api = new API(API_HOLIDAZE_PROFILES);
        const response = await api.getUserTrips(name);

        const now = new Date();
        const formattedTrips = response.data.map((trip) => ({
          ...trip,
          dateFrom: new Date(trip.dateFrom),
          dateTo: new Date(trip.dateTo),
        }));

        set({
          trips: {
            upcoming: formattedTrips.filter((trip) => trip.dateFrom > now),
            past: formattedTrips.filter((trip) => trip.dateTo < now),
            cancelled: response.data.cancelled || [],
          },
        });
      },

      setIsLoading: (value) => set({ isLoading: value }),

      setUser: (userData) =>
        set({
          user: userData,
          isLoggedIn: true,
        }),

      clearUser: () =>
        set({
          user: null,
          isLoggedIn: false,
        }),

      setHostMode: (value) => set({ hostMode: value }),
      setReservations: (data) =>
        set(() => ({
          reservations: {
            all: data.bookings ?? [],
            upcoming:
              data.bookings?.filter((b) => new Date(b.dateFrom) > new Date()) ??
              [],
            past:
              data.bookings?.filter(
                (b) => new Date(b.dateFrom) <= new Date()
              ) ?? [],
            cancelled:
              data.bookings?.filter((b) => b.status === "cancelled") ?? [],
          },
        })),

      message: "",
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

      getVenues: async (name) => {
        const api = new API(API_HOLIDAZE_PROFILES);
        const response = await api.getUserVenues(name);
        set({ userVenues: response.data });
        get().setReservations(response.data);
        return response.data;
      },
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isLoggedIn: state.isLoggedIn,
        hostMode: state.hostMode,
      }),
    }
  )
);
