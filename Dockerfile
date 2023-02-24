# Use an official Node.js runtime as a parent image
FROM node:14-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any necessary dependencies
RUN npm install

# Build the app
RUN npm run build

# Expose port 8080
EXPOSE 8080

# Run the app when the container launches
CMD ["npm", "start"]