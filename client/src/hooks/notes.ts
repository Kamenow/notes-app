import { useEffect, useState } from 'react';
import { CreateNote, Note } from '../types/Note';
import notesService from '../services/notesService';

export default function useNotes(userId: string) {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function loadNotes() {
      const { data: userNotes } = await notesService.getAllNotesByUser(userId);

      setNotes(userNotes);
    }

    if (userId) {
      loadNotes();
    }
  }, [userId]);

  async function createNote(note: CreateNote) {
    try {
      const { data: createdNote } = await notesService.createNote(note);
      setNotes([...notes, createdNote]);
    } catch (error) {
      console.log('error');
    }
  }

  async function deleteNoteById(noteId: string) {
    try {
      await notesService.deleteNoteById(noteId);
      setNotes(notes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.log('error');
    }
  }

  async function updateNoteById(noteId: string, updateNoteData: CreateNote) {
    await notesService.updateNoteById(noteId, updateNoteData);

    const updatedNotes = notes.map((note) => {
      if (note.id === noteId) {
        return { ...note, ...updateNoteData };
      }
      return note;
    });

    setNotes(updatedNotes);
  }

  return { notes, createNote, deleteNoteById, updateNoteById };
}
