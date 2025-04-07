import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar tarefas' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { title, description, completed, userId } = req.body;

  try {
    const task = await prisma.task.create({
      data: { title, description, completed, userId },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description, completed },
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir tarefa' });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar a tarefa' });
  }
};