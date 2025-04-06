# Etapa de build
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Gera o cliente Prisma
RUN npx prisma generate

RUN npm run build

# Etapa final
# Etapa final
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./ 
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env .env   

EXPOSE 3000

CMD ["node", "dist/app.js"]

