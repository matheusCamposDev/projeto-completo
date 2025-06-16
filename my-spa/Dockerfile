FROM node:22.14.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_API__MATRICULAS_URL
ENV VITE_API__MATRICULAS_URL=$VITE_API__MATRICULAS_URL

RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]