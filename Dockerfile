FROM node AS builder
WORKDIR /usr/src/myapp
COPY . .
RUN npm install
RUN npm run build

FROM nginx
COPY --from=builder /usr/src/myapp/dist /usr/share/nginx/html
COPY yuban-nginx.conf /etc/nginx/conf.d

EXPOSE 57036/tcp