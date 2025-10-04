FROM node:20-alpine
WORKDIR /app

ARG SFM_WS=ws://localhost:8000/ws
ARG SFM_CHAT=ws://localhost:8000/brain/ws/chat
ARG SFM_SHA=dev
ENV NEXT_PUBLIC_SFM_WS=$SFM_WS
ENV NEXT_PUBLIC_CHAT_WS=$SFM_CHAT
ENV SFM_SHA=$SFM_SHA

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build
RUN npm prune --production

ENV PORT=8000
EXPOSE 8000
CMD ["npm","start"]
