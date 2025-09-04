FROM node:24

WORKDIR /app

RUN git clone https://github.com/brainstormerjr/portfolio-3-backend.git .

RUN npm install

EXPOSE 3002

CMD ["npm", "run", "start"]