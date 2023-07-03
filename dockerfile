# Build
FROM node:18-alpine as build

WORKDIR /api

ENV PATH /api/node_modules/.bin:$PATH

COPY package.json yarn.lock /api
#RUN cd /api

RUN yarn install --pure-lockfile

COPY . ./

# Server
FROM node:18-alpine

WORKDIR /api


COPY --from=build /api/node_modules ./node_modules
COPY --from=build /api/package*.json ./
COPY --from=build /api ./
COPY .env ./
COPY --from=build /api/prisma/schema.prisma ./prisma/
COPY --from=build /api/prisma/migrations/ ./prisma/
RUN npm config set update-notifier false

COPY --from=build /api/entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

RUN npm config set update-notifier false

ENTRYPOINT ["entrypoint.sh"]

EXPOSE 5000

CMD ["yarn", "start"]
