# Step 1: Use an official Node.js image as a base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /src

# Step 3: Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install --force

# Step 5: Copy the rest of your application code
COPY . .

# Step 6: Build the application
RUN npm run build

# Step 7: Expose a port (the port your app will run on)
EXPOSE 3000

# Step 8: Start the application
CMD ["npm", "start"]