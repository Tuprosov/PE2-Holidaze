import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/Home";
import VenuePage from "./pages/DisplayVenue";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="venue/:id" element={<VenuePage />} />
      </Route>
    </Routes>
  );
}

export default App;

{
  /* <Route index element={<Homepage />} />
        <Route path="venue/:id" element={<Venuepage />} />
        <Route path="wishlist" element={<Wishlistpage />} />
        <Route path="trips" element={<Tripspage />} />
        <Route path="userVenues" element={<userVenues />} />
        <Route path="createListing" element={<createListing />} />
        <Route path="profile" element={<Profilepage />} />
        <Route path="auth" element={<Authpage />} /> */
}
