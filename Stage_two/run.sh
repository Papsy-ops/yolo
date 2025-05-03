#!/bin/bash

cd terraform

echo "[INFO] Initializing Terraform..."
terraform init

echo "[INFO] Applying Terraform..."
terraform apply -auto-approve

IP=$(terraform output -raw instance_ip)

echo "[INFO] Updating inventory.ini..."
echo "[web]" > ../ansible/inventory.ini
echo "$IP ansible_user=vagrant ansible_ssh_private_key_file=~/.ssh/id_rsa" >> ../ansible/inventory.ini

echo "[INFO] Running Ansible playbook..."
cd ../ansible
ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook playbook.yml -i inventory.ini
