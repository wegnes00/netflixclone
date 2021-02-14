const API_KEY = "bf2e55ca69bae48a32ab2cb7f5a44726";

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&language=en-US`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?with_genres=28&api_key=${API_KEY}&language=en-US`,
  fetchComedyMovies: `/discover/movie?with_genres=35&api_key=${API_KEY}&language=en-US`,
  fetchHorrorMovies: `/discover/movie?with_genres=27&api_key=${API_KEY}&language=en-US`,
  fetchRomanceMovies: `/discover/movie?with_genres=10749&api_key=${API_KEY}&language=en-US`,
  fetchDocumentaries: `/discover/movie?with_genres=99&api_key=${API_KEY}&language=en-US`,
};

export default requests;
