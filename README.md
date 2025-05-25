# Holidaze

Holidaze is a venue booking platform where users can browse, search, and book places to stay. The platform features:

* Venue listings with detailed information
* Date and guest filtering
* User login and profile pages
* A mobile-friendly search experience
* Hosting features like managing listings and viewing reservations

## Features

* Responsive design for mobile and desktop
* Search bar with location, date, and guest filtering
* Wishlist and booking functionality
* Host dashboard for managing venues and bookings
* Integration with Noroff API for backend data

## Technologies Used

* React
* Zustand (state management)
* React Router
* Tailwind CSS
* Vite

## Getting Started

### Prerequisites

* Node.js (v18 or later recommended)
* npm (v9 or later)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/holidaze.git
cd holidaze
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and go to:

```
http://localhost:5173
```

## Project Structure

```
src/
├── components/       # Reusable components
├── pages/            # Route-level pages
├── js/store          # Zustand state management
├── App.css           # Global styles and Tailwind config
├── App.jsx           # Main app entry
└── main.jsx          # React DOM render entry
```

## API

This project uses the Noroff Holidaze API: [https://v2.api.noroff.dev/holidaze](https://v2.api.noroff.dev/holidaze)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

## Noroff

This project is a ProjectExam work for Noroff.

