import axios from 'axios';

const API_URL = 'http://localhost:3000/';

export default {
  async addMovie(id: string, user: string) {
    try {
      const response = await axios.get(
        `${API_URL}favorites?idMovie=${id}&user=${user}`
      );
      if (response.data[0]) {
        console.log('pelicula ya agregada');
      } else {
        await axios.post(`${API_URL}favorites`, {
          user: user,
          idMovie: id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  async reviewMovie(id: string, user: string): Promise<boolean> {
    try {
      const response = await axios.get(
        `${API_URL}favorites?idMovie=${id}&user=${user}`
      );
      if (response.data[0]) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async removeMovie(id: string, user: string) {
    try {
      console.log(id, user);
      await axios.delete(`${API_URL}favorites?user=${user}&idMovie=${id}`);
    } catch (error) {
      console.log(error);
    }
  },

  async movieByUser(user: string) {
    try {
      const response = await axios.get(`${API_URL}favorites?user=${user}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
