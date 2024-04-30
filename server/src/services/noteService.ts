import Note from '../models/Note';

export function createNote(body: Note): Promise<Note> {
  return Note.create({
    content: body.content,
    userId: body.userId,
    title: body.title
  });
}

