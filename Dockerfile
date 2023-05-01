# Étape 1 : Construire l'application React
FROM node:16 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Étape 2 : Servir l'application avec Nginx
FROM nginx:1.21.3

# Copier la configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers statiques construits à partir de l'étape 1
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80 pour le serveur Nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

