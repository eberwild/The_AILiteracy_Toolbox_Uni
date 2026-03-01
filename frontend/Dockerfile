FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4137

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "4173"]
