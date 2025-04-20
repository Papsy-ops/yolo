# Containerized E-commerce Platform with Product Management

This project is a containerized e-commerce web application designed to manage retail products using Docker. It comprises a Node.js backend, a React frontend, and a MongoDB database.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

* **Docker:** [https://www.docker.com/get-started](https://www.docker.com/get-started)
* **Docker Compose:** [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)
* **Git:** [https://git-scm.com/downloads](https://git-scm.com/downloads)

## Getting Started

Follow these steps to get the application up and running on your local machine:

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

    * Pull the pre-built backend (`papetua/yolo_backend:v2.0.0`) and frontend (`papetua/yolo_frontend:v2.0.0`) images from Docker Hub.
    * Pull the `papetua/mongo:v2.0.0` MongoDB image from Docker Hub.
    * Create and start the containers for the backend (`yolo-backend`), frontend (`yolo-frontend`), and MongoDB (`mongo`).
    * Establish a network (`app-net`) for communication between the containers.
    * Mount a named volume (`mongo_data`) to persist the MongoDB database.

3.  **Access the application:**

    * Open your web browser and navigate to `http://localhost:3000` to view the e-commerce platform.

## Project Structure

The repository contains the following key files:

* `docker-compose.yml`: Defines and manages the multi-container Docker application.
* `./client/`: Contains the source code and `Dockerfile` for the frontend application.
* `./server/`: Contains the source code and `Dockerfile` for the backend application.
* `explanation.md`: Provides detailed explanations for the implementation choices made in this project.
* `README.md`: This file, providing instructions on how to run the application.

## Important Notes

* **MongoDB Authentication:** The current configuration runs the MongoDB container with authentication **disabled** (`command: mongod --noauth --bind_ip_all` in `docker-compose.yml`). **This is not recommended for production environments due to security risks.** Efforts were made to enable authentication, but persistent issues with the chosen MongoDB image prevented a secure setup.
* **Data Persistence:** Product data added to the application will be persisted in the `mongo_data` Docker volume, ensuring that data is retained across container restarts.
* **Image Availability:** The Docker Compose file relies on the availability of the `papetua/yolo_backend:v2.0.0`, `papetua/yolo_frontend:v2.0.0`, and `papetua/mongo:v2.0.0` images on Docker Hub.

## Further Information

For detailed explanations of the implementation choices, Dockerfile directives, networking, volume usage, Git workflow, and debugging efforts, please refer to the `explanation.md` file in the repository root.

---