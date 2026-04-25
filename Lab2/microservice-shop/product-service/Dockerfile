FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

RUN npx prisma generate --schema=./prisma/schema.prisma

COPY src ./src

EXPOSE 3001

CMD ["npm", "start"]