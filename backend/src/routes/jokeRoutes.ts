import { Router } from 'express';
import {
  getJokes,
  getJokeById,
  createJoke,
  updateJoke,
  deleteJoke,
  randomJoke,
} from '../controllers/jokeController'; // Import the controller functions

const router = Router();

router.get('/random', randomJoke);
router.get('/', getJokes);
router.get('/:id', getJokeById);
router.post('/', createJoke);
router.put('/:id', updateJoke);
router.delete('/:id', deleteJoke);

export default router;
