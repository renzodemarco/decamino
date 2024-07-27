import axios from 'axios';

export const getOsmData = async (query) => {
    try{
        const { data } = await axios.get('https://nominatim.openstreetmap.org/search',{
            params: {
                q: query,
                format: 'json'
            }
        });
        return data;
    }catch (error) {
        throw new Error(error.message);
    }
}