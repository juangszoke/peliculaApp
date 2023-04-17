import axios from 'axios';

const API_URL = 'http://localhost:3000/';

export default {
    async votingMovie(userId: string, idMovie: string, value: number){
        try {
            const response = await axios.get(
              `${API_URL}votes?idMovie=${idMovie}&userId=${userId}`
            );
            if (response.data[0]) {
                await axios.put(`${API_URL}votes/${response.data[0].id}`, {
                    userId: userId,
                    idMovie: idMovie,
                    value: value,
                })
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

    }
    
}