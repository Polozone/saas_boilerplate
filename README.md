# saas_boilerplate

To run the project :

docker-compose build

docker-compose up -d

if you just cloned the project
docker exec -ti nodejs_backend "yarn prisma db push" // will create the db if not exist (from schema.prisma), and generate our Prisma Client