import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    username: localStorage.getItem("username") || "",
    token: localStorage.getItem("token") || "",
    isLoggedIn: !!localStorage.getItem("isLoggedIn"),
    userId: localStorage.getItem("userId") || "",
    email: localStorage.getItem("email") || "",
    nickname: localStorage.getItem("nickname") || "",
    role: localStorage.getItem("role") || "",
    createdAt: localStorage.getItem("createdAt") || "",
    houses: JSON.parse(localStorage.getItem("houses") || "[]"),
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
    setUserDetails(details: {
      userId: string;
      email: string;
      nickname: string;
      role: string;
      createdAt: string;
      houses: any[];
    }) {
      this.userId = details.userId;
      this.email = details.email;
      this.nickname = details.nickname;
      this.role = details.role;
      this.createdAt = details.createdAt;
      this.houses = details.houses;
      localStorage.setItem("userId", details.userId);
      localStorage.setItem("email", details.email);
      localStorage.setItem("nickname", details.nickname);
      localStorage.setItem("role", details.role);
      localStorage.setItem("createdAt", details.createdAt);
      localStorage.setItem("houses", JSON.stringify(details.houses));
    },
    clearUserData() {
      this.username = "";
      this.token = "";
      this.userId = "";
      this.email = "";
      this.nickname = "";
      this.role = "";
      this.createdAt = "";
      this.houses = [];
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      localStorage.removeItem("nickname");
      localStorage.removeItem("role");
      localStorage.removeItem("createdAt");
      localStorage.removeItem("houses");
      this.isLoggedIn = false;
    },
  },
});
