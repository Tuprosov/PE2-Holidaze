import { API_KEY } from "../constants.js";

export function headers() {
  const headers = new Headers();
  const token = JSON.parse(localStorage.getItem("token"));

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  headers.append("Content-type", "application/json");

  return headers;
}
