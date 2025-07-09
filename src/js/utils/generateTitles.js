export function getTitle(page, { user, singleVenue } = {}) {
  if (page.startsWith("/venue/")) {
    return singleVenue?.description || "Holidaze | Venue Details";
  }
  switch (page) {
    case "/":
      return "Holidaze | Rentals, cabins, beachhouses and more";
    case "/profile":
      return `${user.name}'s profile `;
    case "/account":
      return "Set up your account";
    case "/myVenues":
      return `${user.name} - manage your listings`;
    case "/hosting":
      return `${user.name} - see your reservations`;
    case "/trips":
      return `${user.name} - see your trips`;
    default:
      return "Holidaze";
  }
}
