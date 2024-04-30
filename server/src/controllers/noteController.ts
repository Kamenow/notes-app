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

