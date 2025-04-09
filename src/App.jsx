import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="venue/:id" element={<Venuepage />} />
        <Route path="wishlist" element={<Wishlistpage />} />
        <Route path="trips" element={<Tripspage />} />
        <Route path="userVenues" element={<userVenues />} />
        <Route path="createListing" element={<createListing />} />
        <Route path="profile" element={<Profilepage />} />
        <Route path="auth" element={<Authpage />} />
      </Route>
    </Routes>
  );
}

export default App;
