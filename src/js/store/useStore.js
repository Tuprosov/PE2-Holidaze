import { create } from "zustand";

export const useSearchStore = create((set) => ({
  showLocation: false,
  showCalendar: false,
  showGuests: false,
  showSearchBar: false,
  showSuggestions: false,

  setShowLocation: (value) => set({ showLocation: value }),
  setShowCalendar: (value) => set({ showCalendar: value }),
  setShowGuests: (value) => set({ showGuests: value }),
  setShowSuggestions: (value) => set({ showSuggestions: value }),
  toggleSearchBar: () =>
    set((state) => ({ showSearchBar: !state.showSearchBar })),
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
