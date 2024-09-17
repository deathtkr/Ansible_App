# Use the official Node.js image as a base
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY src/ ./src
COPY app.js ./
COPY public/ ./public
COPY view/ ./view

# Copy the .env file (if you have one in the root directory)
COPY .env ./

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]
