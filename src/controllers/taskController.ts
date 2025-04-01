import { Request, Response } from 'express';
import * as taskService from '../services/taskService';

export const getAllTasks = (req: Request, res: Response) => {
  res.json(taskService.getAllTasks());
};

export const getTask = (req: Request, res: Response) => {
  const task = taskService.getTaskById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};

export const createTask = (req: Request, res: Response) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }
  const newTask = taskService.createTask({ title, description });
  res.status(201).json(newTask);
};

export const updateTask = (req: Request, res: Response) => {
  const updatedTask = taskService.updateTask(req.params.id, req.body);
  if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
  res.json(updatedTask);
};

export const deleteTask = (req: Request, res: Response) => {
  const isDeleted = taskService.deleteTask(req.params.id);
  if (!isDeleted) return res.status(404).json({ message: 'Task not found' });
  res.status(204).send();
};