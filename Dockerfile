FROM node:22-alpine

WORKDIR /app

# copy dependencies files
COPY package*.json ./

# install dependencies ci = clean install 
RUN npm ci

# copy project code
COPY . .

# build application
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]