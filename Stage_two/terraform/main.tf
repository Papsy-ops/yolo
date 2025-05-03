provider "google" {
  credentials = file("../service-account.json")
  project     = var.project_id
  region      = var.region
  zone        = var.zone
}

resource "google_compute_instance" "devops_vm" {
  name         = "devops-vm"
  machine_type = "e2-micro"
  zone         = var.zone

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-2204-lts"
    }
  }

  network_interface {
    network = "default"
    access_config {}
  }

  metadata = {
    ssh-keys = "papetua:${file("/home/papetua/.ssh/id_rsa.pub")}"
  }

  tags = ["http-server", "https-server"]

  provisioner "remote-exec" {
    inline = [
      "sudo apt update",
      "sudo apt install -y python3 python3-pip"
    ]

    connection {
      type        = "ssh"
      user        = "papetua"
      private_key = file("/home/papetua/.ssh/id_rsa")
      host        = self.network_interface[0].access_config[0].nat_ip
    }
  }

  provisioner "local-exec" {
    command = <<EOT
        ssh-keygen -R ${self.network_interface.0.access_config.0.nat_ip}
        echo "[web]" > ../ansible/inventory.ini
        echo "${self.network_interface[0].access_config[0].nat_ip} ansible_user=papetua ansible_ssh_private_key_file=/home/papetua/.ssh/id_rsa" >> ../ansible/inventory.ini
        ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook ../ansible/playbook.yml -i ../ansible/inventory.ini
EOT
  }
}

resource "google_compute_firewall" "allow_app_ports" {
  name    = "allow-app-ports"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["22", "3000", "5000", "27017"]
  }

  direction     = "INGRESS"
  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["http-server"]
}

