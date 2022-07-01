FROM node:lts-alpine@sha256:b2da3316acdc2bec442190a1fe10dc094e7ba4121d029cb32075ff59bb27390a

COPY --chown=node:node . /opt/app

WORKDIR /opt/app/server

RUN npm i && \
    npm run build


EXPOSE 8000

CMD ["npm", "start"]