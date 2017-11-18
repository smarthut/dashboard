FROM node:latest as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM alpine:3.6
RUN apk add --no-cache curl bash \
  && curl -fsSL https://getcaddy.com | bash
COPY --from=builder /app/dist /www
COPY Caddyfile /etc/Caddyfile
EXPOSE 80 443 2015
ENTRYPOINT ["caddy"]
CMD ["--conf", "/etc/Caddyfile"]
