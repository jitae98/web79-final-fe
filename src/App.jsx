import React, { useState, useRef, useEffect } from "react";
import MovieList from "../components/MovieList.jsx";
import MovieModal from "../components/MovieModal.jsx";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import "./App.css";

const movies = [
  {
    id: 1,
    title: "Room",
    duration: "117 min 2015",
    description:
      "Jack is a young boy of 5 years old who has lived all his life in one room...",
    image:
      "https://github.com/supahfunk/supah-codepen/blob/master/movie-room.jpg?raw=true",
  },
  {
    id: 2,
    title: "Whiplash",
    duration: "167 min 2015",
    description: "Under the direction of a ruthless instructor...",
    image:
      "https://github.com/supahfunk/supah-codepen/blob/master/movie-whiplash.jpg?raw=true",
  },
  {
    id: 3,
    title: "Mad Max",
    duration: "120 min 2015",
    description:
      "An apocalyptic story set in the furthest reaches of our planet...",
    image:
      "https://github.com/supahfunk/supah-codepen/blob/master/movie-madmax.jpg?raw=true",
  },
  {
    id: 4,
    title: "The Revenant",
    duration: "156 min 2015",
    description:
      "In the 1820s, a frontiersman, Hugh Glass, sets out on a path of vengeance...",
    image:
      "https://github.com/supahfunk/supah-codepen/blob/master/movie-therevenant.jpg?raw=true",
  },
];

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posterStyle, setPosterStyle] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [isRegistering, setIsRegistering] = useState(false);
  const detailRef = useRef(null);

  const handleMovieClick = (movie, event) => {
    const poster = event.currentTarget.querySelector(".poster");
    const posterRect = poster.getBoundingClientRect();

    setSelectedMovie(movie);
    setPosterStyle({
      top: posterRect.top,
      left: posterRect.left,
      width: posterRect.width,
      height: posterRect.height,
    });
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen) {
      const timeoutId = setTimeout(() => {
        setPosterStyle({
          top: "10%",
          left: "10%",
          width: "266px",
          height: "400px",
        });
      }, 10);
      return () => clearTimeout(timeoutId);
    }
  }, [isModalOpen]);

  const handleClose = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedMovie(null);
    }, 500);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleRegister = () => {
    setIsRegistering(true);
  };

  const handleRegisterSuccess = () => {
    setIsRegistering(false);
  };

  return (
    <div
      className="app"
      onClick={(e) => {
        if (detailRef.current && !detailRef.current.contains(e.target))
          handleClose();
      }}
    >
      <header>
        <h1>
          Daily<strong>UI</strong>
        </h1>
        <nav>
          {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
        </nav>
        <div className="search">
          <svg>
            <use xlinkHref="#ico-search"></use>
          </svg>
        </div>
      </header>
      <h2>Most Popular Movies</h2>
      {isLoggedIn ? (
        <>
          <MovieList onSelectMovie={handleMovieClick} />
          {isModalOpen && selectedMovie && (
            <MovieModal
              ref={detailRef}
              movie={selectedMovie}
              onClose={handleClose}
              posterStyle={posterStyle}
            />
          )}
        </>
      ) : isRegistering ? (
        <Register onRegisterSuccess={handleRegisterSuccess} />
      ) : (
        <Login onLogin={handleLogin} onRegister={handleRegister} />
      )}
    </div>
  );
}

export default App;
