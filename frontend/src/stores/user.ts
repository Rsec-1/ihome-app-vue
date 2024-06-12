import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    username: localStorage.getItem("username") || "",
    token: localStorage.getItem("token") || "",
    isLoggedIn: !!localStorage.getItem("isLoggedIn"),
  }),
  getters: {
    isAuthenticated: (state) => state.isLoggedIn,
  },
  actions: {
    setUsername(username: string) {
      this.username = username;
      localStorage.setItem("username", username);
      this.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", "true");
    },
    setToken(token: string) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    clearUserData() {
      this.username = "";
      this.token = "";
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      this.isLoggedIn = false;
    },
  },
});
