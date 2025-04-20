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

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/Papsy-ops/yolo](https://github.com/Papsy-ops/yolo)
    cd yolo
    ```

2.  **Start the application using Docker Compose:**

    ```bash
    docker-compose up -d
    ```

    This command will:

    * Pull the pre-built frontend image `papetua/yolo_frontend:v2.0.0` from Docker Hub.
    * Pull the pre-built backend image `papetua/yolo_backend:v2.0.0` from Docker Hub.
    * Pull the pre-built MongoDB image `papetua/mongo:v2.0.0` from Docker Hub.
    * Create and start the containers for the backend (`yolo-backend`), frontend (`yolo-frontend`), and MongoDB (`mongo`).
    * Establish a network (`app-net`) for communication between the containers.
    * Mount a named volume (`mongo_data`) to persist the MongoDB database.

3.  **Access the application:**

    * Open your web browser and navigate to `http://localhost:3000` to view the e-commerce platform.

## Technical Details

### 1. Base Image Choice

* **Backend:** The `papetua/yolo_backend:v2.0.0` image is a pre-built image. It is assumed to be based on a suitable Node.js base image to run the backend application. The choice to use this image was driven by the project setup and the desire for a consistent image source.
* **Frontend:** The `papetua/yolo_frontend:v2.0.0` image is a pre-built image. It is assumed to be based on a suitable Node.js base image to serve the React frontend. The choice to use this image aligns the frontend image source with the backend and MongoDB images from the `papetua` organization.
* **MongoDB:** The `papetua/mongo:v2.0.0` image, based on `karimtemple/mongo`, was chosen with the initial intention of using a potentially smaller MongoDB image. This aligns the MongoDB image source with the backend and frontend images from the `papetua` organization, creating a more consistent project. However, due to persistent "read-only directory" errors, the final working configuration involves running it with authentication disabled.

### 2. Dockerfile Directives

* The frontend service utilizes a pre-built image `papetua/yolo_frontend:v2.0.0` from Docker Hub. The `Dockerfile` directives for this image are managed by its creator.
* The backend service utilizes a pre-built image `papetua/yolo_backend:v2.0.0` from Docker Hub. The `Dockerfile` directives for this image are managed by its creator.
* The MongoDB service utilizes a pre-built image `papetua/mongo:v2.0.0` from Docker Hub. The `Dockerfile` directives for this image are managed by its creator.

### 3. Docker Compose Networking

We implemented a custom bridge network named `app-net` in the `docker-compose.yml` file:

```yaml
networks:
  app-net:
    driver: bridge
    ipam:
      config:
        - subnet: 172.30.0.0/16
```

This network allows the containers to communicate with each other internally using their service names as hostnames. For instance, the backend connects to the MongoDB service using the URI `mongodb://mongo:27017/yolomy`. We also exposed ports for external access: `3000:80` for the frontend, `5000:5000` for the backend, and `27017:27017` for MongoDB.

### 4. Docker Compose Volume Definition and Usage

We defined a named volume `mongo_data` to persist the MongoDB database files across container restarts:

```yaml
volumes:
  mongo_data:
```

This volume is mounted to the `/data/db` directory within the `mongo` container in the `docker-compose.yml` file:

```yaml
services:
  mongo:
    # ... other configurations
    volumes:
      - mongo_data:/data/db
    # ...
```

This ensures that the database data is stored outside the container's lifecycle.

### 5. Git Workflow

The Git workflow employed was as follows:

1.  Forked the repository `https://github.com/Vinge1718/yolo` to a personal GitHub account `https://github.com/Papsy-ops/yolo` .
2.  Cloned the forked repository to the local development environment.
3.  Modified the `docker-compose.yml` file to define and orchestrate the application's services (frontend, backend, MongoDB), ensuring all core services utilize images from the `papetua` organization for consistency. 
4.  Committed the changes with descriptive commit messages to track the evolution of the Docker Compose setup. 
5.  Pushed the local commits to the `master` branch of the remote GitHub repository (`origin master`).

### 6. Successful Running and Debugging

The application, consisting of the frontend, backend, and MongoDB, runs successfully using `docker-compose up -d`. Debugging efforts included:

* Examining container logs using `docker logs <container_name>` to identify errors (e.g., `docker logs yolo-backend`).
* Gaining shell access to running containers using `docker exec -it <container_name> /bin/sh` to inspect their internal state and configurations.
* Troubleshooting the persistent "read-only directory" issue with the `papetua/mongo:v2.0.0` image by experimenting with different user configurations and ultimately resorting to running the container with authentication disabled as a temporary workaround.


### 7. Docker Image Tag Naming Standards

The `docker-compose.yml` file utilizes specific tags for the Docker images:

* `papetua/yolo_backend:v2.0.0`
* `papetua/yolo_frontend:v2.0.0`
* `papetua/mongo:v2.0.0`

The explicit use of the `v2.0.0` tag for all core application images from the `papetua` organization provides a clear and consistent version identification.

### 8. Image Deployment to DockerHub

The `docker-compose.yml` file references pre-built images hosted on DockerHub under the `papetua` organization. To fully meet this objective, the `papetua/yolo_backend:v2.0.0`, `papetua/yolo_frontend:v2.0.0`, and `papetua/mongo:v2.0.0` images were built and pushed to DockerHub under the `Papsy-ops` account.

### 9. MongoDB Setup and Authentication

The current working configuration in `docker-compose.yml` runs the `papetua/mongo:v2.0.0` image with authentication explicitly disabled using the `command: mongod --noauth --bind_ip_all`. This was implemented as a workaround to address the persistent "read-only directory" errors encountered when attempting to run the image with authentication enabled and a created user. While this allows the application to connect to the database, it is crucial to understand that **running MongoDB without authentication poses significant security risks and is not recommended for production environments.**

Initial attempts were made to enable authentication by connecting to the container, creating a user, and then running MongoDB without the `--noauth` flag. However, these attempts were unsuccessful due to the aforementioned "read-only directory" issues.

### 10. Verification

The base images utilized (`papetua/yolo_backend:v2.0.0`, `papetua/yolo_frontend:v2.0.0`, and `papetua/mongo:v2.0.0`) were chosen to create a consistent application using images from the `papetua` DockerHub organization. This provides a unified source for the application's core components.
```