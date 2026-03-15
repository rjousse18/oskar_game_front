# -------- Build stage --------
FROM node:22-alpine AS build

WORKDIR /app

# Installer dépendances
COPY package*.json ./
RUN npm install

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}

# Copier le code
COPY . .

# Build React
RUN npm run build


# -------- Runtime --------
FROM nginx:alpine

# supprimer config nginx par défaut
RUN rm /etc/nginx/conf.d/default.conf && mkdir -p /tmp/nginx

# copier config nginx
COPY nginx.conf /etc/nginx/nginx.conf

# copier build React
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]