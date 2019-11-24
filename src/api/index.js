import axios from 'axios'

const apiUrl = process.env.VUE_APP_API_URL
const apiKey = process.env.VUE_APP_API_KEY

export const get = () => {
  try {
    const res = axios.get(`${apiUrl}`);
  } catch (error) {}
}
