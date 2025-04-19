# Containerized E-commerce Platform with Product Management

This project is a containerized e-commerce web application that allows you to manage retail products using Docker. It includes a Node.js backend, a React frontend, and a MongoDB database.

## Prerequisites

Before you begin, ensure you have the following installed:

* **Docker:** [https://www.docker.com/get-started](https://www.docker.com/get-started)
* **Docker Compose:** [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)
* **Git:** [https://git-scm.com/downloads](https://git-scm.com/downloads)

## Setup

1.  **Clone the repository:**

    ```bash
    git clone <your_repository_url>
    cd <your_repository_directory>
    ```

2.  **Start the application using Docker Compose:**

    ```bash
    docker-compose up -d
    ```

    This command will:

    * Build the frontend and backend Docker images.
    * Start the MongoDB, backend, and frontend containers.
    * Create a Docker network (`app-net`) for container communication.
    * Mount a volume (`mongo-data`) to persist the MongoDB data.

3.  **Access the application:**

    * Open your web browser and navigate to `http://localhost:3000`.



## Technical Details

### 1. Base Image Choice

* **Backend & Frontend**: Used the official `node:18` image for both services to ensure compatibility and stability with Node.js applications.
* **MongoDB**: Used the official `mongo` image for reliable database functionality and ecosystem compatibility.

### 2. Dockerfile Directives

#### Backend (`Dockerfile.backend`)

```Dockerfile
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
Frontend (Dockerfile.frontend)WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

###  Docker Compose Networking

Defined a custom bridge network called `app-net`:

```yaml
networks:
  app-net:
    driver: bridge
    ipam:
      config:
        - subnet: 172.30.0.0/16

** *Containers communicate internally using service names, such as:Mongo URI: mongodb://mongo-app:27017/yolomy4.  
** *Volume Usage : Used a named volume mongo-data to persist MongoDB data between restarts:volumes:
  mongo-data:

Container Naming ConventionServiceImage NameContainer NameMongoDBmongomongo-appBackendpapetua/yolo_backendyolo-backend-v1Frontendpapetua/yolo_frontendyolo-frontend-v16. Git WorkflowForked and cloned the repo.Worked in a feature branch for modular development.Used descriptive commit messages and regularly pushed to GitHub for version tracking.

Debugging TechniquesUsed the following to troubleshoot:docker logs yolo-backend-v1
docker exec -it yolo-backend-v1 /bin/sh
Fixed Axios Network Error by adding the following to the frontend service in docker-compose.yml:stdin_open: true
tty: true
restart: always

Docker Image Tagging (Versioning)Used Semantic Versioning (semver) for all images:Example: papetua/yolo_backend:v1.1.0Tagged and pushed images to DockerHub:docker tag yolo_backend papetua/yolo_backend:v1.1.0
docker push papetua/yolo_backend:v1.1.0

Image Deployment to DockerHub
All versioned images were successfully pushed to DockerHub:
Backend: papetua/yolo_backend:v2.0.0
Frontend: papetua/yolo_frontend:v2.0.0. 
MongoDB Setup and AuthenticationThe MongoDB container uses the official mongo image and is configured to persist data in the mongo-data volume.Important: MongoDB is set up with authentication. The application connects to MongoDB using the service name mongo-app defined in the docker-compose.yml. 

The root username and password for MongoDB are set using the following environment variables in the docker-compose.yml file:environment:
```Dockerfile
  docker run --name mongo -d -v ./mongodb_data:/data/db papetua/mongo:v2.0.0 mongod --bind_ip_all --noauth
  docker exec -it db mongo
> use admin
> db.createUser({ user: "whatever", pwd: "something", roles: [{role: "readWrite" db: "example"}], mechanisms: ["SCRAM-SHA-1"] })
docker container rm -f db


Note: The application is configured to connect to the MongoDB database using the URI: mongodb://<your_mongo_root_username>:<your_mongo_root_password>@mongo-app:27017/yolomy?authSource=admin11. Verification