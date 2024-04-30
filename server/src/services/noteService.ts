import Note from '../models/Note';

export function createNote(body: Note): Promise<Note> {
  return Note.create({
    content: body.content,
    userId: body.userId,
    title: body.title
  });
}

export function getNoteById(noteId: string): Promise<Note | null> {
  return Note.findByPk(noteId);
}

export function deleteNoteById(noteId: string): Promise<number> {
  return Note.destroy({
    where: {
      id: noteId
    }
  });
}

export function getAllNotesOfUser(userId: string): Promise<Note[]> {
  return Note.findAll({
    where: {
      userId
    }
  });
}
