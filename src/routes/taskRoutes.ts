import express from 'express';
import { Router } from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} from '../controllers/taskController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(authenticateToken);
router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', getTaskById); 
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;