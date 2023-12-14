# Set the base image to Node
FROM node:18-alpine

# Set the workdir in the docker container
WORKDIR /usr/src/app

# Copy the entire source code
COPY . .

# Install dependencies
RUN yarn

# Build the Next.js application

# Expose the listening port
EXPOSE 4400

# Run the application
CMD [ "yarn", "run", "dev" ]