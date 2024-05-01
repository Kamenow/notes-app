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

export async function updateNoteById(
  noteId: string,
  title: string,
  content: string
): Promise<Note> {
  const note = await getNoteById(noteId);

  if (!note) {
    throw { message: 'Note not found' };
  }

  if (title !== undefined) {
    note.title = title;
  }
  if (content !== undefined) {
    note.content = content;
  }

  await note.save();
  return note;
}
