import Task from '../interfaces/Task';

let tasks: Task[] = [];

const generateId = (): string => Math.random().toString(36).substring(2, 9);

export const getAllTasks = (): Task[] => tasks;

export const getTaskById = (id: string): Task | undefined => 
  tasks.find(task => task.id === id);

export const createTask = (taskData: Omit<Task, 'id' | 'completed' | 'createdAt' | 'updatedAt'>): Task => {
  const newTask: Task = {
    id: generateId(),
    ...taskData,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  tasks.push(newTask);
  return newTask;
};

export const updateTask = (id: string, taskData: Partial<Task>): Task | null => {
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) return null;
  
  const updatedTask = {
    ...tasks[taskIndex],
    ...taskData,
    updatedAt: new Date()
  };
  
  tasks[taskIndex] = updatedTask;
  return updatedTask;
};

export const deleteTask = (id: string): boolean => {
  const initialLength = tasks.length;
  tasks = tasks.filter(task => task.id !== id);
  return tasks.length !== initialLength;
};