FROM node:20.11.1-slim

RUN adduser --disabled-password --gecos '' worker
RUN npm install -g npm@10.2.4

USER worker
WORKDIR /home/worker

COPY --chown=worker:worker package.json .
COPY --chown=worker:worker package-lock.json .

RUN npm install --legacy-peer-deps

COPY --chown=worker:worker . .

# Use OpenSSL legacy provider to avoid digital envelope routines::unsupported error
ENV NODE_OPTIONS=--openssl-legacy-provider


RUN npm run build

ENV HOST 0.0.0.0

CMD ["npm", "run", "start"]

