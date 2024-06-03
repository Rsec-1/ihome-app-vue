// src/stores/user.ts
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    username: localStorage.getItem('username') || '',
    isLoggedIn: !!localStorage.getItem('isLoggedIn'),
  }),
  getters: {
    isAuthenticated: (state) => state.isLoggedIn,
  },
  actions: {
    setUsername(username: string) {
      this.username = username;
      localStorage.setItem('username', username);
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
    },
    clearUsername() {
      this.username = '';
      localStorage.removeItem('username');
      localStorage.removeItem('isLoggedIn');
      this.isLoggedIn = false;
    },
  },
});
