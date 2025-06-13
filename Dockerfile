FROM node:20-alpine
WORKDIR /app


COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build
RUN npm prune --production

ENV PORT=3000
EXPOSE 3000
CMD ["npm","start"]
