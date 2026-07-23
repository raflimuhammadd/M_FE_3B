import { create } from "zustand";
import { registerUser, loginUser } from "../api/authService";

const useAuthStore = create((set) => ({
  // ── State ──
  user: JSON.parse(localStorage.getItem('chill-user') || 'null'),
  isLoading: false,
  error: null,

  // ── Actions ──
  register: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const newUser = await registerUser({
        ...credentials,
        fullName: '',
        email: '',
        subscriptionStatus: false,
        avatar: '',
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('chill-user', JSON.stringify(newUser));
      set({ user: newUser, isLoading: false });
      return true;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return false;
    }
  },

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const users = await loginUser(credentials.username);
      if (users.length === 0) {
        set({ error: 'Username tidak ditemukan', isLoading: false });
        return false;
      }
      const foundUser = users[0];
      if (foundUser.password !== credentials.password) {
        set({ error: 'Kata sandi salah', isLoading: false });
        return false;
      }
      localStorage.setItem('chill-user', JSON.stringify(foundUser));
      set({ user: foundUser, isLoading: false });
      return true;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('chill-user');
    set({ user: null, error: null });
  },
}));

export default useAuthStore;