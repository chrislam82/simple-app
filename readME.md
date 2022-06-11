# Simple-App
Simple App built using node/express for Backend and python http.server for accessing index.html for frontend. App is extremely basic since the purpose isnt the app itself.

**Purpose:**
- To learn basics of node and express
- Practise basic software engineering practises
- Exploring other things like using containers and cloud

## Setup
The app is currently setup using Docker Desktop v4.8.2 with Docker Engine 20.10.14
Front and backend can be run separately but currently written to be built and deployed using docker-compose

### Install Docker
Install Docker from https://www.docker.com/ if not installed

### Download Repo
Download or clone repo as normal

### Setup Named Volume (Docker)
Docker currently using external named volume **simple-app-volume** for storing the backend data stored in msgs.json. Named volume needs to be created prior to running docker-compose
```
docker volume create simple-app-volume
```

### Set environment variables
Copy .env.example as .env
```
cp .env.example .env
```
and change ports to desired ports in .env

### Build and Run
Run command from directory /simple-app where docker-compose.yaml is located
```
docker compose up
```

## Other things to explore
- Cloud (Heroku, AWS (EC2, ECS))
- CI/CD
- Testing (Including Front-end testing)
- Add linter and setup linting rules
- ... To add more as it comes to mind
