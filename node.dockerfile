FROM node:12
WORKDIR /app
COPY ./BE/package.json /app
COPY ./BE /app
RUN npm install
CMD ["npm", "start"]
EXPOSE 3000
