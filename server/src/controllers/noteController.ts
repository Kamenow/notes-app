import { Request, Response } from 'express';
import * as noteService from '../services/noteService';

export async function createNote(req: Request, res: Response) {
  try {
    const note = await noteService.createNote(req.body);
    res.status(200).json(note);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getNoteById(req: Request<{ id: string }>, res: Response) {
  try {
    const note = await noteService.getNoteById(req.params.id);

    if (!note) {
      return res.status(400).send("note doesn't exist");
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function deleteNoteById(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const itemsDeleted = await noteService.deleteNoteById(req.params.id);

    if (itemsDeleted < 1) {
      return res.status(400).send('note not found');
    }

    res.status(200).send('deleted successfully');
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getAllNotesOfUser(
  // TODO: add type in types file
  req: Request<{ id: string }, {}, { user: User }>,
  res: Response
) {
  try {
    const notes = await noteService.getAllNotesOfUser(req.params.id);

    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function updateNoteById(
  // TODO: add type in types file
  req: Request<{ id: string }, {}, { title: string; content: string }>,
  res: Response
) {
  try {
    const note = await noteService.updateNoteById(
      req.params.id,
      req.body.title,
      req.body.content
    );

    res.status(200).send(note);
  } catch (error) {
    res.status(500).send(error);
  }
}
