FROM node:latest

WORKDIR /back

COPY package*.json ./

RUN corepack enable pnpm

RUN pnpm install 

COPY . .

RUN npx prisma generate

RUN pnpm run build 

EXPOSE 3000

CMD ["pnpm", "start"]
