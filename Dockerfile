FROM node:16

# Create app directory
WORKDIR /app
COPY package*.json /app

RUN npm install
COPY . .


EXPOSE 8080
RUN chmod +x /app/start.sh
CMD ./start.sh
