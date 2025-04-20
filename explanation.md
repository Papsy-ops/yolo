```markdown
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

    * Build the frontend Docker image (if a `Dockerfile` is present in `./client`).
    * Pull the pre-built backend (`papetua/yolo_backend:v2.0.0`) and MongoDB (`papetua/mongo:v2.0.0`) Docker images from Docker Hub.
    * Start the MongoDB (`mongo`), backend (`yolo-backend`), and frontend (`yolo-frontend`) containers.
    * Create a Docker network (`app-net`) for container communication.
    * Mount a volume (`mongo_data`) to persist the MongoDB data.

3.  **Access the application:**

    * Open your web browser and navigate to `http://localhost:3000`.

## Technical Details

### 1. Base Image Choice

* **Backend:** The `papetua/yolo_backend:v2.0.0` image is assumed to be built upon a suitable base image (likely Node.js) by the image creator. Our choice was to use this pre-built image as provided.
* **Frontend:** The `papetua/yolo_frontend:v2.0.0` image is assumed to be built upon a suitable base image (likely Node.js) by the image creator. Our choice was to use this pre-built image as provided.
* **MongoDB:** We initially attempted to use the `papetua/mongo:v2.0.0` image, which is based on `karimtemple/mongo`. While we encountered persistent "read-only directory" errors that we couldn't resolve, the intent was likely to use a smaller, potentially optimized MongoDB image. For the final working configuration (albeit with security risks acknowledged), we used this image.

### 2. Dockerfile Directives

* The `docker-compose.yml` indicates that the frontend service is built using a `Dockerfile` located at `./client`. The directives within that `Dockerfile` (e.g., `FROM`, `WORKDIR`, `COPY`, `RUN`, `EXPOSE`, `CMD`) define how the frontend image is created.
* The backend and MongoDB services use pre-built images from Docker Hub, so their `Dockerfile` directives are managed by the image creators.

#### Example Frontend (`./client/Dockerfile` - Assumed Structure)

```Dockerfile
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80
CMD ["npm", "start"]
```

### 3. Docker Compose Networking

We defined a custom bridge network called `app-net`:

```yaml
networks:
  app-net:
    driver: bridge
    ipam:
      config:
        - subnet: 172.30.0.0/16
```

* Containers communicate internally using service names as hostnames (e.g., `mongo` for the MongoDB service). The backend connects to MongoDB using the URI: `mongodb://mongo:27017/yolomy`.
* Port mappings expose the application to the host:
    * Frontend: `3000:80` (host port 3000 maps to container port 80)
    * Backend: `5000:5000` (host port 5000 maps to container port 5000)
    * MongoDB: `27017:27017` (host port 27017 maps to container port 27017)

### 4. Docker Compose Volume Definition and Usage

We used a named volume `mongo_data` to persist MongoDB data between restarts:

```yaml
volumes:
  mongo_data:
```

This volume is mounted to the `/data/db` directory inside the `mongo` container, ensuring that database files are stored outside the container's lifecycle.

### 5. Git Workflow

1.  Forked the repository to a personal GitHub account.
2.  Cloned the forked repository to the local development environment.
3.  Made changes to the `docker-compose.yml` to orchestrate the containers.
4.  Committed changes with descriptive messages (e.g., "Initial Docker Compose setup", "Configure backend service", "Add frontend service", "Implement MongoDB service", "Disable MongoDB authentication").
5.  Pushed the local commits to the remote GitHub repository (`origin master`).

### 6. Successful Running and Debugging

* The application components (frontend, backend, MongoDB) are orchestrated using `docker-compose up -d` and are running.
* Debugging involved:
    * Checking container logs using `docker logs <container_name>` (e.g., `docker logs yolo-backend`).
    * Attempting to execute commands inside containers using `docker exec -it <container_name> /bin/sh`.
    * Troubleshooting persistent "read-only directory" errors with the `papetua/mongo:v2.0.0` image by trying different configurations and ultimately running it with authentication disabled as a workaround (with acknowledged security risks).
    * Resolving a `git push` "hickup" which was likely a temporary issue.

### 7. Docker Image Tag Naming Standards

* The `docker-compose.yml` uses specific tags for the pre-built images:
    * `papetua/yolo_backend:v2.0.0`
    * `papetua/yolo_frontend:v2.0.0`
    * `papetua/mongo:v2.0.0`
* This explicit tagging helps in identifying specific versions of the images. While not strictly following SemVer conventions as initially intended, the use of `v2.0.0` provides a level of version identification.

### 8. Image Deployment to DockerHub

The `docker-compose.yml` references images that are assumed to be available on DockerHub under the `papetua` organization. To fully meet this objective, the custom backend and frontend images would need to be built (using `docker build -t papetua/yolo_backend:v2.0.0 -f Dockerfile.backend .` and similar for the frontend) and then pushed to DockerHub using `docker push papetua/yolo_backend:v2.0.0` and `docker push papetua/yolo_frontend:v2.0.0`. The `papetua/mongo:v2.0.0` image is also assumed to have been pushed to DockerHub.

### 9. MongoDB Setup and Authentication

The `docker-compose.yml` for the working configuration runs the `papetua/mongo:v2.0.0` image with authentication explicitly disabled using the `command: mongod --noauth --bind_ip_all` directive. While this allows the application to connect, it's important to reiterate the security implications.

The initial attempts involved setting up authentication by temporarily disabling it, creating a user, and then re-enabling it. However, we encountered persistent issues with the `papetua/mongo:v2.0.0` image that prevented successful authentication.

### 10. Verification

The base images used (`papetua/yolo_backend:v2.0.0`, `papetua/yolo_frontend:v2.0.0`, and `papetua/mongo:v2.0.0`) were chosen as provided in the project or based on the need to get the application running. The initial intent with `papetua/mongo:v2.0.0` was likely to use a smaller image.
```