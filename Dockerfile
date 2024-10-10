# Step 1: Use an official Node.js image as a base image
FROM node:18-alpine

# Step 2: Install git using apk for Alpine-based images
RUN apk update && apk add git

# Step 3: Set the working directory inside the container
WORKDIR /src

# Step 4: Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Step 5: Install dependencies
RUN npm install --force

# Step 6: Copy the rest of your application code
COPY . .

# Step 7: Build the application
RUN npm run build

# Step 8: Expose a port (the port your app will run on)
EXPOSE 3000

# Step 9: Start the application
CMD ["npm", "start"]