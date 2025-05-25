import { API_AUTH_REGISTER, API_AUTH_LOGIN } from "../constants.js";
import { headers } from "../utils/headers.js";

export class Auth {
  static async register({ name, email, password, venueManager = true }) {
    try {
      const response = await fetch(API_AUTH_REGISTER, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ name, email, password, venueManager }),
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
    const url = new URL(API_AUTH_LOGIN);
    url.searchParams.set("_holidaze", true);
    url.searchParams.set("venueManager", true);
    try {
      const response = await fetch(url, {
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
