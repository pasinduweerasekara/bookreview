FROM node:20
WORKDIR /app
ENV MONGO_URI mongodb+srv://wmpmweerasekara:RU6iQE9HWZEZLqTs@cluster0.247h7.mongodb.net/BookReviewApp
ENV PORT 5000
ENV NODE_ENV development
ENV JWT_SECRET SECRET
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "node", "index.js" ]