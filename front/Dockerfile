FROM node:latest

WORKDIR /front

COPY package*.json ./

RUN corepack enable pnpm

RUN pnpm install

COPY . .

RUN npx prisma generate

RUN pnpm run build

EXPOSE 5173

CMD ["pnpm", "start"]
