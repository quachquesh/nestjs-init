FROM node:16
WORKDIR /usr/src/app/nestjs_init
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
CMD ["npm", "run", "start:dev"]