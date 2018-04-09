# use node LTS image from the cloud directory
FROM node:carbon

# Create app directory inside the image
WORKDIR /usr/src/app

# Install app dependencies, copy files from host machine to container image
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# copy application sources from dev machine to container except files of .dockerignore
COPY . .

# allow container to expose port 3000
EXPOSE 3000

#run command npm start inside container
CMD [ "npm", "start" ]