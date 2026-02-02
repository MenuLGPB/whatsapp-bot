FROM node:18-bullseye

# Instalar dependencias del sistema críticas para compilar módulos (sharp, etc.)
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    libvips-dev \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias forzando la compilación desde la fuente si es necesario
RUN npm install --unsafe-perm --build-from-source

# Copiar el resto del código
COPY . .

CMD ["npm", "start"]
