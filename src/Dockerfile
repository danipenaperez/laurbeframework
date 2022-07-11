# https://www.coderconsole.com/2019/06/how-to-create-docker-image-with-nodejs.html

# Select the Node Module
FROM node:11

# Add the working Directory
WORKDIR /app

# COPY out package.json to our working directory /app
COPY package*.json /app/
COPY js /app/js

# RUN npm install which will download all the dependencies from package.json
RUN npm install

# COPY the current content to /app folder structure
COPY . /app/

# UGLIFY the src/*.js
# RUN npm run build

RUN npm i grunt
RUN npm install -g grunt-cli
RUN npm install

RUN grunt
# EXPOSE our port
#EXPOSE 9000

# Create EntryPoint of index.js file
#ENTRYPOINT ["node", "index.js"]