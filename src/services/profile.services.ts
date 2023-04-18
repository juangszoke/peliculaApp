import axios from 'axios';
import User from '@/interfaces/user';

const API_URL = 'http://localhost:3000/';


export default {

    async profileInformation(user: number) {
        try {
          const response = await axios.get(
            `${API_URL}users?id=${user}`
          );
          if (response.data[0]) {
            return response.data[0]
          }
        } catch (error) {
          console.log(error);
        }
      },

      async UpdateInformation(user: User, userActive: string) {
        
        const response = await axios.get(
          `${API_URL}users?user=${user.user}`
        );
        if( response.data[0] && user.user !== userActive){
          return false
        }
        else{
          try{
            await axios.put(`${API_URL}users/${user.id.toString()}`, {
              user: user.user,
              name: user.name,
              email: user.email,
              password: user.password,
              phone_number: user.phone_number,
              country: user.country,
              city: user.city,
              genre: user.genre,
              
          })
          return true
          }catch(error){
            console.log(error)
            return false
          }
        }   
    }
}