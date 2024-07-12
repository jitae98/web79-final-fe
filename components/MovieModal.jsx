import React, { useRef, useEffect } from "react";

const MovieModal = React.forwardRef(({ movie, onClose, posterStyle }, ref) => {
  const posterRef = useRef(null);

  useEffect(() => {
    const posterElement = posterRef.current;
    posterElement.style.top = `${posterStyle.top}px`;
    posterElement.style.left = `${posterStyle.left}px`;
    posterElement.style.width = `${posterStyle.width}px`;
    posterElement.style.height = `${posterStyle.height}px`;

    const timeoutId = setTimeout(() => {
      posterElement.style.top = `10%`;
      posterElement.style.left = `10%`;
      posterElement.style.width = `266px`;
      posterElement.style.height = `400px`;
    }, 10);
    return () => clearTimeout(timeoutId);
  }, [posterStyle]);

  return (
    <div className="detail" ref={ref}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img
          src={movie.image}
          alt={movie.title}
          className="poster"
          ref={posterRef}
        />
        <div className="title">{movie.title}</div>
        <div className="info">
          <span className="length">{movie.duration.split(" ")[0]}</span>
          <span className="year">{movie.duration.split(" ")[2]}</span>
        </div>
        <div className="desc">{movie.description}</div>
        <button className="play" onClick={() => alert("Play movie")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 232.153 232.153"
            width="10px"
            height="10px"
          >
            <g id="Play">
              <path
                style={{ fillRule: "evenodd", clipRule: "evenodd" }}
                d="M203.791,99.628L49.307,2.294c-4.567-2.719-10.238-2.266-14.521-2.266c-17.132,0-17.056,13.227-17.056,16.578v198.94c0,2.833-0.075,16.579,17.056,16.579c4.283,0,9.955,0.451,14.521-2.267l154.483-97.333c12.68-7.545,10.489-16.449,10.489-16.449S216.471,107.172,203.791,99.628z"
                fill="#FFFFFF"
              />
            </g>
          </svg>{" "}
          play movie
        </button>
      </div>
    </div>
  );
});

export default MovieModal;
