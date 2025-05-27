import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/global/Layout";
import HomePage from "./pages/Home";
import VenuePage from "./pages/DisplayVenue";
import AuthPage from "./pages/Auth";
import TripsPage from "./pages/Trips";
import AccountPage from "./pages/Account";
import ProfilePage from "./pages/Profile";
import HostingPage from "./pages/Hosting";
import ListingPage from "./pages/Listing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="venue/:id" element={<VenuePage />} />
        <Route path="trips" element={<TripsPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/hosting" element={<HostingPage />} />
      <Route path="/myVenues" element={<ListingPage />} />
    </Routes>
  );
}

export default App;
