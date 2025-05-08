import { headers } from "../utils/headers.js";
export class API {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  //Search venues
  async searchListings(query) {
    try {
      const response = await fetch(
        `${this.baseURL}/search?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch listings: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching search results:", error);
      throw error;
    }
  }

  // Create a new venue
  async createVenue(venueData) {
    try {
      const response = await fetch(this.baseURL, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(listingData),
      });

      if (!response.ok) {
        throw new Error("Failed to create listing");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating listing:", error);
      throw error;
    }
  }

  // Get venues
  async getVenues(_owner = true, _bookings = true) {
    const url = new URL(this.baseURL);
    url.searchParams.set("_owner", _owner);
    url.searchParams.set("_bookings", _bookings);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers(),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch venues");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  }

  // Get a specific venue by ID
  async getVenue(id) {
    const url = new URL(this.baseURL);
    const newUrl = new URL(`${url}/${id}`);
    newUrl.searchParams.append("_owner", true);
    newUrl.searchParams.append("_bookings", true);

    try {
      const response = await fetch(newUrl, {
        method: "GET",
        headers: headers(),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch venue");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching venue:", error);
    }
  }

  // Update an existing venue
  async updateListing(id, updatedData) {
    try {
      const response = await fetch(`${this.baseURL}${id}`, {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update listing");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating listing:", error);
    }
  }

  // Delete a venue by ID
  async deleteListing(id) {
    try {
      const response = await fetch(`${this.baseURL}${id}`, {
        method: "DELETE",
        headers: headers(),
      });

      if (!response.ok) {
        throw new Error("Failed to delete venue");
      }

      return { message: "Venue deleted successfully" };
    } catch (error) {
      console.error("Error deleting venue:", error);
    }
  }
  //   book a venue
  async bookVenue(booking) {
    try {
      const response = await fetch(this.baseURL, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(booking),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.errors.message || "Failed to book the venue."
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error booking venue:", error);
      throw error;
    }
  }

  //   get profile
  async getProfile(name) {
    const url = new URL(this.baseURL);
    const newUrl = new URL(`${url}/${name}`);
    newUrl.searchParams.append("_wins", true);
    newUrl.searchParams.append("_listings", true);

    try {
      const response = await fetch(newUrl, {
        method: "GET",
        headers: headers(),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch the profile");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  //  update profile
  async updateAccount(name, updatedData) {
    const url = new URL(this.baseURL);
    const newUrl = new URL(`${url}/${name}`);

    try {
      const response = await fetch(newUrl, {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        const data = await response.json();
        const errorMessage = data.errors
          ? data.errors.map((error) => error.message).join(", ")
          : "An unknown error occurred.";
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  }
}
