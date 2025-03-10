#!/bin/sh

echo "print env"
env

# Lancer Prisma Studio en arrière-plan
echo "Starting Prisma Studio..."
yarn prisma studio &
yarn prisma generate &
yarn prisma migrate deploy &

# Lancer l'application
echo "Starting the application..."
nc -zv ${DATABASE_HOSTNAME:-postgresql_database} 5432 || (echo "Cannot connect to database" && exit 1)
# yarn start

yarn workspace @waboostr/backend start:dev
