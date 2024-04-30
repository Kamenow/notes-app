import express from 'express';
import * as noteController from '../controllers/noteController';

const router = express.Router();

router.post('/create-note', noteController.createNote);
router.delete('/:id', noteController.deleteNoteById);

export default router;
