import { headers } from "../utils/headers.js";
export class API {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  //Search listings
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

  // Create a new listing
  async createListing(listingData) {
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

  // Get 12 listings
  async getListings(limit = 12, page = 1) {
    const url = new URL(this.baseURL);
    url.searchParams.append("limit", limit);
    url.searchParams.append("page", page);
    url.searchParams.append("_active", true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers(),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  }

  // Get a specific listing by ID
  async getListingById(id) {
    const url = new URL(this.baseURL);
    const newUrl = new URL(`${url}/${id}`);
    newUrl.searchParams.append("_seller", true);
    newUrl.searchParams.append("_bids", true);

    try {
      const response = await fetch(newUrl, {
        method: "GET",
        headers: headers(),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch listing");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching listing:", error);
    }
  }

  // Update an existing listing
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

  // Delete a listing by ID
  async deleteListing(id) {
    try {
      const response = await fetch(`${this.baseURL}${id}`, {
        method: "DELETE",
        headers: headers(),
      });

      if (!response.ok) {
        throw new Error("Failed to delete listing");
      }

      return { message: "Listing deleted successfully" };
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  }
  //   place bid
  async placeBid(id, bidAmount) {
    try {
      const response = await fetch(`${this.baseURL}/${id}/bids`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ amount: bidAmount }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors.message || "Failed to place the bid.");
      }

      return await response.json();
    } catch (error) {
      console.error("Error placing bid:", error);
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
