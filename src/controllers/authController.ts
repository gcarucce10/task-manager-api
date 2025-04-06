import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const SECRET = 'seu_segredo_jwt';

export const login = async (req: Request, res: Response) => {
  const { emailOrUsername, password } = req.body;

  const input = emailOrUsername.toLowerCase();

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: input },
        { username: input }
      ]
    }
  });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
    expiresIn: '1h'
  });

  res.json({ token });
};

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
