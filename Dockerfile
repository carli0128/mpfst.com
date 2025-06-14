FROM node:20-alpine
WORKDIR /app

ARG SFM_WS=ws://localhost:8000/ws
ENV NEXT_PUBLIC_SFM_WS=$SFM_WS

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build
RUN npm prune --production

ENV PORT=3000
EXPOSE 3000
CMD ["npm","start"]
