import { defineStore } from 'pinia';
import apiClient from '../utils/axios';

interface UserState {
  token: string | null;
  userInfo: {
    username: string;
    email?: string;
    nickname?: string;
  } | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: localStorage.getItem('token'),
    userInfo: null
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    clearToken() {
      this.token = null;
      localStorage.removeItem('token');
    },
    async login(username: string, password: string) {
      const response = await apiClient.post('/api/users/login', { username, password });
      this.setToken(response.data.token);
      this.userInfo = response.data.user;
    },
    async register(username: string, password: string, email?: string, nickname?: string) {
      const response = await apiClient.post('/api/users/register', { username, password, email, nickname });
      this.setToken(response.data.token);
      this.userInfo = response.data.user;
    },
    logout() {
      this.clearToken();
      this.userInfo = null;
    }
  },
  getters: {
    isAuthenticated(state): boolean {
      return !!state.token;
    }
  }
});
