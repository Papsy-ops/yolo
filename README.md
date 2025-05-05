# Containerized E-commerce Platform with Product Management

This project is a containerized e-commerce web application designed to manage retail products using Docker and automated provisioning using Ansible. It comprises a Node.js backend, a React frontend, and a MongoDB database, all orchestrated with Docker Compose inside a Vagrant-provisioned Ubuntu virtual machine.

## Prerequisites

Before you begin, ensure the following tools are installed:

- **Vagrant**: [https://www.vagrantup.com/downloads](https://www.vagrantup.com/downloads)
- **VirtualBox** (or another provider): [https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads)
- **Ansible**: [https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)
- **Git**: [https://git-scm.com/downloads](https://git-scm.com/downloads)

## Getting Started

Follow these steps to get the application up and running inside a provisioned VM:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Papsy-ops/yolo
    cd yolo
    ```

2. **Start the Vagrant VM:**

    ```bash
    vagrant up
    ```

    This command will:
    - Download and provision an Ubuntu 20.04 virtual machine using the official `geerlingguy/ubuntu2004` box.
    - Use Ansible as the provisioner to automatically configure the environment.
    - Clone this repository inside the VM.
    - Set up Docker and Docker Compose.
    - Build or pull Docker images and run the containers.

3. **Access the application:**

    Open your browser and visit `http://localhost:3000` to access the frontend of the e-commerce application.

## Ansible Playbook Overview

The provisioning logic is defined in an Ansible playbook located at the project root. Key features:

- **Roles**:
  - `frontend`: Sets up and launches the React client.
  - `backend`: Handles the Node.js API setup.
  - `mongodb`: Configures MongoDB for development.

- **Blocks and Tags**: Playbook tasks are organized using `block` structures and tagged with names like `frontend`, `backend`, `db`, and `docker` for selective execution and readability.

- **Variables**: External variable files are used to manage configuration settings such as port numbers, image versions, and MongoDB options.

## Project Structure

- `Vagrantfile`: Provisions the virtual machine using VirtualBox and Vagrant.
- `playbook.yml`: Main Ansible playbook for provisioning the environment.
- `roles/`: Contains Ansible roles for frontend, backend, and MongoDB setup.
- `docker-compose.yml`: Defines and manages the multi-container Docker setup.
- `client/`: React frontend source code and Dockerfile.
- `backend/`: Node.js backend source code and Dockerfile.
- `explanation.md`: Detailed notes on implementation choices and configuration logic.
- `README.md`: You are here.

## Notes on MongoDB

- **Authentication Disabled**: For development simplicity and automated setup, MongoDB runs with `--noauth`. This is insecure for production use.
- **Volume Persistence**: Data is stored in the `mongo_data` Docker volume, preserving product entries between restarts.

## Docker Images Used

- `papetua/yolo_backend:v2.0.0`
- `papetua/yolo_frontend:v2.0.0`
- `papetua/mongo:v2.0.0`

These are pulled automatically during provisioning if not already present.

## Testing Add Product Feature

After the application launches, you can test the "Add Product" functionality using the form on the site to submit and display new products dynamically.

---

For deeper implementation insights, refer to [`explanation.md`](./explanation.md).
