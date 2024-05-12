FROM node:latest

WORKDIR /back

ENV PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=true

COPY package*.json ./

RUN npm install

RUN npm install -g typescript

RUN npx prisma generate

COPY . .

RUN tsc

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]
