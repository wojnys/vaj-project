import { Router } from 'express';
import {
  getUsers,
  getUsetrById,
  updateUser,
} from '../controllers/userController'; // Import the controller functions

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUsetrById);
router.put('/:id', updateUser);

export default router;
