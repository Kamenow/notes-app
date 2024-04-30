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

