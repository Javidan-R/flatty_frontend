// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./layouts/Layout";
import NotFound from "./pages/NotFound";
import Loading from "./components/Loading";

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const Search = lazy(() => import("./pages/Search.jsx"));
const Appartment = lazy(() => import("./pages/Appartment"));
const Agent = lazy(() => import("./pages/Agent"));
const Complex = lazy(() => import("./pages/Complex"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const About = lazy(() => import("./pages/About"));

const MapView = lazy(() => import("./pages/MapView"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/appartment/:id" element={<Appartment />} />
            <Route path="/about" element={<About />} />
            <Route path="/agent" element={<Agent />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/complex/:id" element={<Complex />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
