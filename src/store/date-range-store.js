import { create } from 'zustand';

const useDateRangeStore = create((set) => ({
  dateRange: 'today',
  setDateRange: (range) => set({ dateRange: range }),
}));

export default useDateRangeStore;
