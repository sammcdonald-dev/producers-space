# Dockerfile

FROM node:20-alpine

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Generate Prisma client
COPY prisma ./prisma
RUN npx prisma generate

# Copy app source
COPY . .

# Expose port and set start command
EXPOSE 3000
CMD ["npm", "run", "dev"]
