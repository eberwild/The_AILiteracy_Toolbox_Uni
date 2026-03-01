# basic node image
FROM node:20

# set the working directory inside the docker container
# every command will run in /app
WORKDIR /app

# copy package.json and package-lock,.json
# docker will cache the installation for all dependencies
# cached -> faster rebuilds
COPY package*.json ./

# the cached dependencies will be installed so the app work
RUN npm install

# copy the rest of the backend source code into the container
COPY . .

# expose the port the express server will run on
EXPOSE 3000

# define the command that runs when the container starts
CMD ["npm", "start"]
