import axios from 'axios';
import movieFav from '@/interfaces/moviesFav';

const API_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = 'api_key=1b84b89236c65f17c4f3cfb56751525d';

export default {
  async getPopular(page: number) {
    try {
      const { data } = await axios.get(
        `${API_URL}/popular?page=${page}&${API_KEY}`
      );

      return data.results;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async getPopularByGenres(genres: number[], page: number) {
    try {
      const { data } = await axios.get(
        `${API_URL}/popular?page=${page}&with_genres=${genres.join(
          ','
        )}&${API_KEY}`
      );

      return data.results;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async getByidMovie(id: string) {
    try {
      const { data } = await axios.get(`${API_URL}${id}?${API_KEY}`);
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async getActorsByMovie(id: string) {
    try {
      const { data } = await axios.get(`${API_URL}${id}/credits?${API_KEY}`);

      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async getTrailersByMovie(id: string) {
    try {
      const { data } = await axios.get(`${API_URL}${id}/videos?${API_KEY}`);

      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async getMoviesFavorites(ids: movieFav[]) {
    const movieDetails = [];
    for (let i = 0; i < ids.length; i++) {
      const movieId = ids[i].idMovie;
      const response = await axios.get(`${API_URL}${movieId}?${API_KEY}`);
      movieDetails.push(response.data);
    }
    return movieDetails;
  },
};
