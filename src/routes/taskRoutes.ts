import express from 'express';
import { Router } from 'express';
import { 
  getAllTasks, 
  getTask, 
  createTask, 
  updateTask, 
  deleteTask 
} from '../controllers/taskController';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

router.get('/', verifyToken, getAllTasks);
router.get('/:id', verifyToken, getTask);
router.post('/', verifyToken, createTask);
router.put('/:id', verifyToken, updateTask);
router.delete('/:id', verifyToken, deleteTask);

export default router;