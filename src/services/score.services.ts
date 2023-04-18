import axios from 'axios';
import vote from '@/interfaces/votes';

const API_URL = 'http://localhost:3000/';

export default {
  async votingMovie(userId: string, idMovie: string, value: number) {
    try {
      const response = await axios.get(
        `${API_URL}votes?idMovie=${idMovie}&userId=${userId}`
      );
      if (response.data[0]) {
        await axios.put(`${API_URL}votes/${response.data[0].id}`, {
          userId: userId,
          idMovie: idMovie,
          value: value,
        });
      } else {
        await axios.post(`${API_URL}votes`, {
          userId: userId,
          idMovie: idMovie,
          value: value,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  async reviewVoting(idMovie: string) {
    try {
      const response = await axios.get(`${API_URL}votes?idMovie=${idMovie}`);
      if (response.data[0]) {
        let sumaTotal = 0;
        response.data.forEach((voto: vote) => {
          sumaTotal += voto.value;
        });
        const promedio = sumaTotal / response.data.length;
        return promedio;
      } else {
        return 0;
      }
    } catch (error) {
      console.log(error);
      return 0;
    }
  },

  async getVoting(idMovie: string, userId: string) {
    try {
      const response = await axios.get(
        `${API_URL}votes?idMovie=${idMovie}&userId=${userId}`
      );
      if (response.data[0]) { 
        return response.data[0].value;
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
      return undefined;
    }
  },
};
