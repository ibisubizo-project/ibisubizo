FROM mhart/alpine-node:12

WORKDIR /app
COPY package.json /app
COPY . .

RUN npm install
RUN npm run build

EXPOSE 80
CMD ["npm", "run", "start"]
