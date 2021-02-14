import React, { useEffect, useState } from "react";
import "./Banner.css";
import api from "../data/api";
import requests from "../data/requests";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await api.get(requests.fetchNetflixOriginals);
      setMovie(
        request?.data?.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  console.log(movie);
  function truncate(string, n) {
    return string?.length > n ? string.substring(0, n - 1) + `...` : string;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie?.name}</h1>
        <div className="banner_buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <div className="banner__description">
          {truncate(movie?.overview, 150)}
        </div>
      </div>
      <div className="banner--fadebottom" />{" "}
    </header>
  );
}

export default Banner;
