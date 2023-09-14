import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NetflixNavbar from "./MyComponents/NetflixNavbar";
import NetflixMain from "./MyComponents/NetflixMain";
import NetflixFooter from "./MyComponents/NetflixFooter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SuperheroCarousel from "./MyComponents/SuperheroCarousel";
import MovieDetails from "./MyComponents/MovieDetails";
import ActionComedyCarousel from "./MyComponents/ActionComedyCarousel";
import FantasyCarousel from "./MyComponents/FantasyCarousel";
import Profile from "./MyComponents/Profile";
import Settings from "./MyComponents/Settings";

function App() {
  return (
    <>
      <BrowserRouter>
        <NetflixNavbar />
        <Routes>
          <Route path="/" element={<NetflixMain />} />
          <Route
            path="/tv-shows"
            element={
              <>
                <SuperheroCarousel />
                <ActionComedyCarousel />
                <FantasyCarousel />
              </>
            }
          />
          <Route path="/movie-details/:movieID" element={<MovieDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <NetflixFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
