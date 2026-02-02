FROM node:18-bullseye

WORKDIR /app

# Copiar package.json y .npmrc si existe (aunque npm install usa defaults si no se copia)
COPY package*.json ./

# Instalar dependencias con permisos completos
RUN npm install


COPY . .

CMD ["npm", "start"]
