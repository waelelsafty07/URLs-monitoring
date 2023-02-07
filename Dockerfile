FROM node:14 as base 

WORKDIR /app
COPY package.json .

FROM base as development

RUN  npm install
COPY . .
EXPOSE 4000
CMD [ "npm","run","dev" ]

FROM base as production

RUN  npm install --only=production
COPY . .
EXPOSE 4000
CMD [ "npm","run","start" ]