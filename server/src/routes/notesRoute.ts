import express from 'express';
import * as noteController from '../controllers/noteController';

const router = express.Router();

router.post('/create-note', noteController.createNote);
router.delete('/:id', noteController.deleteNoteById);
router.get('/:id', noteController.getNoteById);
router.get('/user/:id', noteController.getAllNotesOfUser);

export default router;
