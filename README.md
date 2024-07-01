# LEGO manager app

## How to set up envs

in root there should be 3 env files - env/env.backend/env.frontend/env.db

### env
is for docker to properly set up the app for public hosting
- ORIGIN=https://lego-manager.fun
- SECRET=backend
- SECRET_MEDIA_ORIGIN=your_ip:port_of_backend
### env.backend
is for backend part and is read by docker when building 
- it contains DATABASE_URL - currently root and root is used and it is address can be found in docker-compose.yml
- and JWT_SECRET - up to you but should be strong
### env.frontend
is essentially only for checking if currently logged in user has a cookie with session that exists
- it contains DATABASE_URL - currently root and root is used and it is address can be found in docker-compose.yml
### env.db
is for db, can be changed as you wish but the app relies on it
- MYSQL_ROOT_PASSWORD=root
- MYSQL_DATABASE=lego-manager-db
- MYSQL_USER=lego
- MYSQL_PASSWORD=lego
