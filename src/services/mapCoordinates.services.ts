import axios from 'axios';

export default {
  async getCoordinates(country: string): Promise<number[] | undefined> {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?country=${country}&format=json`
      );

      if (response.data.length > 0) {
        const latitude = parseFloat(response.data[0].lat);
        const longitude = parseFloat(response.data[0].lon);

        return [latitude, longitude];
      } else {
        console.error(
          'no se encuentra el pais en la api, el pais es: ' + country
        );
        return undefined;
      }
    } catch (error) {
      console.error('Error al obtener coordenadas:', error);
      return undefined;
    }
  },

  async userVotes(idMovie: string) {
    try {
      const response = await axios.get(
        `http://localhost:3000/votes?idMovie=${idMovie}`
      );
      if (response.data[0]) {
        return response.data;
      } else {
        console.log('no hay usuarios que hayan calificado esta pelicula');
      }
    } catch (error) {
      console.log(error);
    }
  },

  async getUsers(idUser: string) {
    try {
      const response = await axios.get(`http://localhost:3000/users/${idUser}`);

      if (response.data) {
        return [response.data.name, response.data.country];
      } else {
        console.log('usuario no encontrado');
      }
    } catch (error) {
      console.log(error);
    }
  },
};
