import request from 'supertest';
import app from '../app'; 
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

const prisma = new PrismaClient();

describe('Autenticação - /auth/login', () => {
  const userData = {
    username: 'usuario_teste',
    email: 'teste@example.com',
    password: 'senha123',
  };

  beforeEach(async () => {
    // Limpa o banco de dados antes de cada teste
    await prisma.user.deleteMany();

    // Cria um usuário de teste com senha criptografada
    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    await prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
      },
    });
  });

  afterAll(async () => {
    // Encerra a conexão com o banco de dados após todos os testes
    await prisma.$disconnect();
  });

  it('Deve autenticar com sucesso e retornar um token JWT', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        emailOrUsername: userData.email,
        password: userData.password,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(typeof response.body.token).toBe('string');
  });

  it('Deve falhar ao autenticar com credenciais inválidas', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        emailOrUsername: userData.email,
        password: 'senha_incorreta',
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });
});
