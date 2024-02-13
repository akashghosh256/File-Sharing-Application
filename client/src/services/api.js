import axios from 'axios';
const API_URL = 'http://localhost:8000';  //backend api url

export const uploadFileAPI = async (data) => {
    try{
 let response = await axios.post(`${API_URL}/upload`, data);  //api endpoint = url/upload
 return response.data;
    }
    catch(error){
        console.log("Error from API js, Error:", error.message);
    }
}














