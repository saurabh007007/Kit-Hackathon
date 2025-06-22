FROM node:24-alpine

WORKDIR  /app 

COPY package*.json ./

RUN npm install 

COPY . .

ENV ANTHROPIC_API_KEY=

ENV PORT=3000

ENV DATABASE_URL=

RUN npm run build

EXPOSE 3000

CMD ["npm","run","dev"]