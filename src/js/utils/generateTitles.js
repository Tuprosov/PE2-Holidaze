export function getTitle(page, { user, venue } = {}) {
  switch (page) {
    case "/":
      return "Holidaze | Rentals, cabins, beachhouses &amp; more";
    case "/venue":
      return venue.description | "Venue Details";
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
