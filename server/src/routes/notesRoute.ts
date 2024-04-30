import express from 'express';
import * as noteController from '../controllers/noteController';

const router = express.Router();

router.post('/create-note', noteController.createNote);

export default router;
