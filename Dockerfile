FROM node:8

ADD yarn.lock /yarn.lock
ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn
RUN yarn build

WORKDIR /app
ADD . /app

EXPOSE 80

ENTRYPOINT ["/bin/bash", "/app/run.sh"]
CMD ["start"]
