FROM node:18

RUN adduser -D appuser
USER appuser

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --ignore-scripts
COPY src/ public/ index.html package.json package-lock.json tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts ./

RUN npm run build
CMD ["npm", "run", "dev"]


EXPOSE 3000
