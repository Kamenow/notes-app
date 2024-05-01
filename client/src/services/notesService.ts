import { AxiosResponse } from 'axios';
import { HttpMethods, URL } from './apiUrl';
import { CreateNote, Note } from '../types/Note';
import { apiCall } from '../helpers/apiCall';

class NotesService {
  createNote(noteData: CreateNote): Promise<AxiosResponse<Note>> {
    return apiCall({
      url: `${URL}/notes/create-note`,
      method: HttpMethods.post,
      restricted: true,
      data: noteData
    });
  }

  deleteNoteById(noteId: string) {
    return apiCall({
      url: `${URL}/notes/${noteId}`,
      method: HttpMethods.delete,
      restricted: true
    });
  }

  getAllNotesByUser(userId: string): Promise<AxiosResponse<Note[]>> {
    return apiCall({
      url: `${URL}/notes/user/${userId}`,
      method: HttpMethods.get,
      restricted: true
    });
  }

  getNoteById(noteId: string): Promise<AxiosResponse<Note>> {
    return apiCall({
      url: `${URL}/notes/${noteId}`,
      method: HttpMethods.get,
      restricted: true
    });
  }

  updateNoteById(
    noteId: string,
    noteData: Partial<Note>
  ): Promise<AxiosResponse<Note>> {
    return apiCall({
      url: `${URL}/notes/${noteId}`,
      method: HttpMethods.patch,
      restricted: true,
      data: noteData
    });
  }
}

const notesService = new NotesService();
export default notesService;
