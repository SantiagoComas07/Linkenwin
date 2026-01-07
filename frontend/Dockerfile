FROM node:20-alpine
WORKDIR /app/frontend
COPY package*.json ./frontend/
RUN  npm install
COPY . .
RUN  npm run build

