FROM node:latest

WORKDIR /back

COPY package*.json ./

ENV PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1

RUN npm install

RUN npm install -g typescript

COPY . .

RUN npx prisma generate

RUN npx prisma db push

RUN tsc

EXPOSE 3000

CMD ["npm", "start"]