import  request  from "supertest";
import app from '../app'

describe('Teste da API - Rota Raiz', () => {
    it('Deve responder com status 200 e mensagem correta', async () => {
      const resposta = await request(app).get('/');
      expect(resposta.status).toBe(200);
      expect(resposta.text).toBe('Task Manager API is running');
    });
  });
