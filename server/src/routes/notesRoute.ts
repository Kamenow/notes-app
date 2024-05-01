import express from 'express';
import * as noteController from '../controllers/noteController';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.post('/create-note', verifyToken, noteController.createNote);
router.delete('/:id', verifyToken, noteController.deleteNoteById);
router.get('/:id', verifyToken, noteController.getNoteById);
router.get('/user/:id', verifyToken, noteController.getAllNotesOfUser);
router.patch('/:id', verifyToken, noteController.updateNoteById);

export default router;
