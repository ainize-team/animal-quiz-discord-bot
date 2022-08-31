FROM node:16.15.1

# Create app directory
WORKDIR /app
COPY package*.json /app/

RUN npm install
COPY . ./

RUN npm install --location=global supervisor

EXPOSE 8080
RUN chmod +x /app/start.sh
CMD ./start.sh
