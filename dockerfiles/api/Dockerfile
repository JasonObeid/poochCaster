FROM node:alpine
WORKDIR /root/poochCaster
COPY package.json package-lock.json dist/apps/api ./
RUN npm ci --production
EXPOSE 3333
CMD ["node", "main.js"]
