FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Use legacy peer deps to avoid TypeScript conflict
RUN npm install --legacy-peer-deps

COPY . .

CMD ["npm", "start"]
