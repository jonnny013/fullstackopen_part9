import axios from 'axios';
import {Note, NewNote} from './type';

const baseUrl = 'http://localhost:3001/notes';

export const getAllNotes = () => {
  return axios.get<Note[]>(baseUrl).then(response => response.data);
};

export const createNote = (object: NewNote) => {
  return axios.post<Note>(baseUrl, object).then(response => response.data);
};
