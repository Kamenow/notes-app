import { Response } from 'express';
import * as noteService from '../services/noteService';
import { AuthorizedRequest } from '../interfaces/Request';

export async function createNote(req: AuthorizedRequest, res: Response) {
  if (!req?.user?.id) {
    return res.status(401).send({ message: 'unathorized' });
  }

  try {
    const note = await noteService.createNote({
      ...req.body,
      userId: req?.user?.id
    });
    res.status(200).json(note);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getNoteById(req: AuthorizedRequest, res: Response) {
  try {
    const note = await noteService.getNoteById(req.params.id);

    if (req?.user?.id !== note?.userId) {
      return res.status(401).send({ message: 'unathorized' });
    }

    if (!note) {
      return res.status(400).send({ message: "note doesn't exist" });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function deleteNoteById(req: AuthorizedRequest, res: Response) {
  try {
    const note = await noteService.getNoteById(req.params.id);

    if (req?.user?.id != note?.userId) {
      return res.status(401).send({ message: 'unathorized' });
    }

    if (!note) {
      return res.status(404).send({ message: 'note not found' });
    }

    note.destroy();

    res.status(200).send({ message: 'deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getAllNotesOfUser(req: AuthorizedRequest, res: Response) {
  if (req?.user?.id.toString() !== req.params.id) {
    return res.status(401).send({ message: 'unathorized' });
  }

  try {
    const notes = await noteService.getAllNotesOfUser(req.params.id);

    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function updateNoteById(req: AuthorizedRequest, res: Response) {
  try {
    const note = await noteService.updateNoteById(
      req.params.id,
      req.body.title,
      req.body.content
    );

    if (req?.user?.id != note.id) {
      return res.status(401).send({ message: 'unathorized' });
    }

    res.status(200).send(note);
  } catch (error) {
    res.status(500).send(error);
  }
}
