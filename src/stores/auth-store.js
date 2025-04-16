import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isAuthenticated: localStorage.getItem('stride-auth') === 'true',
  isLoading: false,
  
  login: (email, password) => {
    // Simple authentication logic
    if (email === "vishaltailor@stride.com" && password === "admin") {
      localStorage.setItem('stride-auth', 'true');
      set({ isAuthenticated: true });
      return true;
    }
    return false;
  },
  
  logout: () => {
    localStorage.removeItem('stride-auth');
    set({ isAuthenticated: false });
  },
  
  checkAuth: () => {
    const isAuthenticated = localStorage.getItem('stride-auth') === 'true';
    set({ isAuthenticated });
    return isAuthenticated;
  }
}));
