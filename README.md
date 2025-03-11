# saas_boilerplate

__To run the project in dev__:

``yarn install``

``docker-compose build``

``docker-compose up -d``

if you just cloned the project: 
``docker exec -ti nodejs_backend "yarn prisma db push"`` >> will create the db if not exist (from schema.prisma), and generate your Prisma Client

__To run the project in prod__: 
If you want to easily deploy the repository through coolify (Vercel like, but free & open source)

1. Get a VPS (you need to match Coolify requirements for RAM & CPU)  
1.1 Get a domain-name (optional)  
1.2 Redirect your domain-name to your VPS (optional)
3. Install Coolify on your VPS. Setup a localhost project and link your github repository from the coolify dashboard UI
4. Set all environment variables through coolify dashboard UI (see list below, note that you will have to create a Brevo account for that)
5. (this step is only required if you followed step 1.1 and 1.2 ):
Connect to your VPS (through SSH or coolify dashboard UI) and setup the proxy. (Coolify use traefik)
To do that (from coolify dashboard UI) go to: server > localhost > terminal

``cd /data/coolify/proxy/dynamic``

``nano dynamic_conf.yml``

Here is my config, for example :
__________________________________________________________________________________
````
http:
  routers:
    frontend:
      rule: "Host(`www.saas.paulmulin.fr`) || Host(`saas.paulmulin.fr`)"
      entryPoints: ["https", "http"]
      middlewares: ["redirect-to-https"]
      service: "frontend-service"
      tls:
        certResolver: letsencrypt

    api:
      rule: "Host(`www.api.saas.paulmulin.fr`)"
      entryPoints: ["https", "http"]
      middlewares: ["redirect-to-https"]
      service: "backend-service"
      tls:
        certResolver: letsencrypt

  middlewares:
    redirect-to-https:
      redirectScheme:
        scheme: "https"
        permanent: true

    frontend-service:
      loadBalancer:
        servers:
          - url: "http://frontend-hgks80sow8ockccww488kgog:3000"

    backend-service:
      loadBalancer:
        servers:
          - url: "http://backend-hgks80sow8ockccww488kgog:4000"
````

_____________________________________________________________________________

restart the proxy :
``docker restart coolify-proxy``

(optional) check the logs with : ``docker logs coolify-proxy``

5. Go to your project configuration, change the "docker-compose location" to "/docker-compose.prod.yml".
6. You can then manually deploy or use the webhook to deploy when you push on the main branch of your project.

List of environments variables that you will have to set in Coolify dashboard UI :

````

ACCESS_TOKEN_DURATION (you can use unit, for example: "30m, 1h, 30d...") 
MAGIC_LINK_TOKEN_DURATION
REFRESH_TOKEN_DURATION
JWT_REFRESH_SECRET
JWT_SECRET
NODE_ENV="production"
BREVO_API_KEY
DATABASE_HOSTNAME
DATABASE_URL=""(I think you should use quotes for special characters)
POSTGRES_DB
POSTGRES_PASSWORD
POSTGRES_USER
FRONTEND_URL (if you followed steps 1.1 and 1.2)
REACT_APP_API_URL="https://www.api.saas.paulmulin.fr" (for example, in my case)
````
