#!/bin/sh

# Vérifier le contenu du dossier
echo "Directory contents:"
ls -la /app
ls -la /app/dist

# Vérifier que main.js existe
if [ ! -f /app/dist/main.js ]; then
    echo "Error: /app/dist/main.js not found!"
    exit 1
fi

# Vérifier la connexion à la base de données
echo "Testing database connection..."
nc -zv ${DATABASE_HOSTNAME:-postgresql_database} 5432 || (echo "Cannot connect to database" && exit 1)

# Appliquer les migrations en production
echo "Applying database migrations..."
yarn prisma migrate deploy --schema=./prisma/schema.prisma

# Démarrer l'application
echo "Starting the application..."
node dist/main.js 