FROM node:21.2.0

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# FROM nginx:latest

EXPOSE 3000
CMD ["npm", "run", "dev"]

