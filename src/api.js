import axios from 'axios'

console.log(process.env.VUE_APP_LISTEN_NOTES_API_KEY)

export const listenNotesApi = axios.create({
  baseURL: 'https://listen-api.listennotes.com/api/v2',
  headers: {
    'X-ListenAPI-Key': process.env.VUE_APP_LISTEN_NOTES_API_KEY,
  },
})