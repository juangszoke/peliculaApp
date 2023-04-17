import axios from 'axios';

const API_URL = 'http://localhost:3000/';

export default {
  async addMovie(id: string, userId: string) {
    try {
      const response = await axios.get(
        `${API_URL}favorites?idMovie=${id}&userId=${userId}`
      );
      if (response.data[0]) {
        console.log('pelicula ya agregada');
      } else {
        await axios.post(`${API_URL}favorites`, {
          userId: userId,
          idMovie: id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  async reviewMovie(id: string, userId: string): Promise<number> {
    try {
      const response = await axios.get(
        `${API_URL}favorites?idMovie=${id}&userId=${userId}`
      );
      if (response.data[0]) {
        return response.data[0].id;
      }
      return -1;
    } catch (error) {
      console.log(error);
      return -1;
    }
  },

  async removeMovie(id: string) {
    try {
      await axios.delete(`${API_URL}favorites/${id}`);
    } catch (error) {
      console.log(error);
    }
  },

  async movieByUser(userId: string) {
    try {
      const response = await axios.get(`${API_URL}favorites?userId=${userId}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
