# Specify a base image
FROM node:14

# Specify a working directory inside the docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code to the working directory
COPY . .

# Expose the port that your app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
