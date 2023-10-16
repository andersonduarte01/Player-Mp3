import axios from 'react-native-axios'

const songs = axios.create({
    baseURL: 'https://dlsolutions.com.br/'
});

export default songs; 