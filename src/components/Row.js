import React, { useEffect, useState } from "react";
import "./Row.css";
import api from "../data/api";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

function Row(props) {
  const [movies, setMovies] = useState([]);
  const BASE_URL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    async function fetchData() {
      const request = await api.get(props.fetchUrl);
      setMovies(request?.data?.results);
      return request;
    }
    fetchData();
  }, []);

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="row__posters">
        {movies?.map((movie) => {
          return (
            ((props.isLargeRow && movie?.poster_path) ||
              (!props.isLargeRow && movie?.backdrop_path)) && (
              <img
                key={movie?.id}
                className={`row__poster ${
                  props.isLargeRow && "row__posterLarge"
                }`}
                src={`${BASE_URL}${
                  props.isLargeRow ? movie?.poster_path : movie?.backdrop_path
                }`}
                alt={movie?.name || movie?.title}
              />
            )
          );
        })}
      </div>
    </div>
  );
}

export default Row;
