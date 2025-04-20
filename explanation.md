```markdown
# Containerized E-commerce Platform with Product Management

This project is a containerized e-commerce web application that allows you to manage retail products using Docker.
It includes a Node.js backend, a React frontend, and a MongoDB database.

## Prerequisites

Before you begin, ensure you have the following installed:

* **Docker:** [https://www.docker.com/get-started](https://www.docker.com/get-started)
* **Docker Compose:** [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)
* **Git:** [https://git-scm.com/downloads](https://git-scm.com/downloads)

## Setup

### 1. Clone the repository:

To begin, clone the project repository from GitHub using the following command:

```bash
git clone [https://github.com/Papsy-ops/yolo](https://github.com/Papsy-ops/yolo)
cd yolo
```

### 2. Start the application using Docker Compose:

Navigate into the cloned directory and start the application using Docker Compose:

```bash
docker-compose up -d
```

This command will perform the following actions:

* Pull the pre-built frontend image `papetua/yolo_frontend:v2.0.0` from Docker Hub.
* Pull the pre-built backend image `papetua/yolo_backend:v2.0.0` from Docker Hub.
* Pull the pre-built MongoDB image `papetua/mongo:v2.0.0` from Docker Hub.
* Create and start the containers for the backend (`yolo-backend`), frontend (`yolo-frontend`), and MongoDB (`mongo`).
* Establish a network (`app-net`) for communication between the containers.
* Mount a named volume (`mongo_data`) to persist the MongoDB database.

### 3. Access the application:

Once the containers are running, you can access the e-commerce platform in your web browser by navigating to:

* `http://localhost:3000`

## Technical Details

### Base Image Choice

* **Backend:** The `papetua/yolo_backend:v2.0.0` image is a pre-built image, assumed to be based on a suitable Node.js base image for running the backend application. This choice ensures consistency in the image source across the project.
* **Frontend:** The `papetua/yolo_frontend:v2.0.0` image is a pre-built image, assumed to be based on a suitable Node.js base image for serving the React frontend. This aligns the frontend image source with the backend and MongoDB images from the `papetua` organization.
* **MongoDB:** The `papetua/mongo:v2.0.0` image, based on `karimtemple/mongo`, was initially selected with the intention of using a potentially smaller MongoDB image, consistent with the `papetua` image source strategy. However, due to unresolved "read-only directory" errors, the final configuration runs with authentication disabled.

### Dockerfile Directives

The frontend (`papetua/yolo_frontend:v2.0.0`), backend (`papetua/yolo_backend:v2.0.0`), and MongoDB (`papetua/mongo:v2.0.0`) services utilize pre-built images from Docker Hub. The specific `Dockerfile` directives used to create these images are managed by their respective creators.

### Docker Compose Networking

A custom bridge network named `app-net` is defined in the `docker-compose.yml` file:

```yaml
networks:
  app-net:
    driver: bridge
    ipam:
      config:
        - subnet: 172.30.0.0/16
```

This network enables internal communication between containers using their service names as hostnames (e.g., the backend connects to MongoDB via `mongodb://mongo:27017/yolomy`). Port mappings are also defined to expose the application to the host: `3000:80` for the frontend, `5000:5000` for the backend, and `27017:27017` for MongoDB.

### 4. Docker Compose Volume Definition and Usage

A named volume `mongo_data` is defined to persist MongoDB data across container restarts:

```yaml
volumes:
  mongo_data:
```

This volume is mounted to the `/data/db` directory within the `mongo` service in the `docker-compose.yml` file:

```yaml
services:
  mongo:
    # ... other configurations
    volumes:
      - mongo_data:/data/db
    # ...
```

This ensures data within the MongoDB container persists beyond the container's lifecycle.

### 5. Git Workflow

The Git workflow followed these steps:

1.  Forked the repository `https://github.com/Vinge1718/yolo` to the personal GitHub account `https://github.com/Papsy-ops/yolo`.
2.  Cloned the forked repository to the local development environment.
3.  Modified the `docker-compose.yml` file to orchestrate the frontend, backend, and MongoDB services, ensuring consistent use of images from the `papetua` organization.
4.  Committed changes with descriptive messages to track the evolution of the Docker Compose setup.
5.  Pushed the local commits to the `master` branch of the remote GitHub repository (`origin master`).

### 6. Successful Running and Debugging

The application, consisting of the frontend, backend, and MongoDB, runs successfully using `docker-compose up -d`, orchestrating the frontend, backend, and MongoDB containers. Debugging efforts included examining container logs (`docker logs <container_name>`), accessing container shells (`docker exec -it <container_name> /bin/sh`), and troubleshooting the "read-only directory" issue with the `papetua/mongo:v2.0.0` image, which led to the decision to run it with authentication disabled as a temporary solution.

### 7. Docker Image Tag Naming Standards

The `docker-compose.yml` file consistently uses the `v2.0.0` tag for the core application images from the `papetua` organization:

* `papetua/yolo_backend:v2.0.0`
* `papetua/yolo_frontend:v2.0.0`
* `papetua/mongo:v2.0.0`

This explicit tagging provides clear and consistent version identification for the project's dependencies.

### 8. Image Deployment to DockerHub

The `docker-compose.yml` file references pre-built images hosted on DockerHub under the `papetua` organization. The `papetua/yolo_backend:v2.0.0`, `papetua/yolo_frontend:v2.0.0`, and `papetua/mongo:v2.0.0` images were built and pushed to DockerHub under the `Papsy-ops` account, ensuring they are accessible for deployment.

### 9. MongoDB Setup and Authentication

The current working configuration in `docker-compose.yml` runs the `papetua/mongo:v2.0.0` image with authentication disabled using the `command: mongod --noauth --bind_ip_all`. This was implemented as a workaround for persistent "read-only directory" errors that prevented enabling authentication. **Running MongoDB without authentication is a significant security risk and is not recommended for production environments.**

Initial attempts to enable authentication by creating a user were unsuccessful due to the aforementioned issues.

### 10. Verification

The base images (`papetua/yolo_backend:v2.0.0`, `papetua/yolo_frontend:v2.0.0`, and `papetua/mongo:v2.0.0`) were selected to establish a uniform image source from the `papetua` DockerHub organization for the core application components.
```