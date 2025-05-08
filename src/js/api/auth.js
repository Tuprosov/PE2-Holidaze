import { headers } from "../utils/headers.js";

export class Auth {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  static async register({ name, email, password }) {
    try {
      const response = await fetch(this.baseURL, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Registration failed: ${error.errors[0].message}`);
      }

      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error("Error during registration:", error.message);
      throw error;
    }
  }

  static async login({ email, password }) {
    try {
      const response = await fetch(this.baseURL {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Login failed: ${error.errors[0].message}`);
      }
      const { data } = await response.json();
      //   const { accessToken: token, ...user } = data;
      return data;
    } catch (error) {
      console.error("Error during login:", error.message);
      throw error;
    }
  }

  static logout() {
    localStorage.clear();
  }
}
