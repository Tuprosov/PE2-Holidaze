import { create } from "zustand";

const useSearchStore = create((set) => ({
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
export default useSearchStore;
