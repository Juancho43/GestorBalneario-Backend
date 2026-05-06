#!/bin/bash

# Detener el script si ocurre algún error
set -e

echo "=== INICIANDO CONSTRUCCIÓN DE ALTO RENDIMIENTO ==="

echo "[1/4] Empaquetando NestJS con esbuild..."
node build-backend.js

echo "[2/4] Generando el Blob de Node SEA..."
node --experimental-sea-config sea-config.json

echo "[3/4] Preparando el binario base (Puro/Sin Recortar)..."
if [ ! -f "node-base" ]; then
    echo "      Descargando Node.js oficial (v20.19.2)..."
    curl -sL -O https://nodejs.org/dist/v20.19.2/node-v20.19.2-linux-x64.tar.xz
    tar -xJf node-v20.19.2-linux-x64.tar.xz node-v20.19.2-linux-x64/bin/node --strip-components=2
    mv node node-base
    rm node-v20.19.2-linux-x64.tar.xz
fi

# Copiamos nuestro binario maestro para crear el ejecutable de esta compilación
cp node-base backend-server

echo "[4/4] Inyectando el código en el binario..."
npx postject backend-server NODE_SEA_BLOB sea-prep.blob \
    --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2

echo "[5/5] Limpiando archivos temporales..."
rm sea-prep.blob

echo "=== CONSTRUCCIÓN COMPLETADA EXITOSAMENTE ==="
echo "Tu binario final está listo: ./backend-server"