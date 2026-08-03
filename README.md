# 🚀 End-to-End MERN CI/CD Pipeline

A complete **MERN Stack** application integrated with an automated **CI/CD pipeline** using **Jenkins**, **Docker**, **Docker Compose**, **GitHub**, and **Docker Hub**.

The project demonstrates how code changes are automatically built, tested, containerized, deployed, and verified through health checks.

---

# 📖 Table of Contents

- Project Overview
- Features
- Architecture
- Technology Stack
- Project Structure
- CI/CD Workflow
- Screenshots
- Getting Started
- Environment Variables
- Docker Commands
- API Endpoints
- Future Improvements
- Author

---

# 📌 Project Overview

This project showcases an end-to-end DevOps workflow for a MERN application.

Whenever code is pushed to GitHub:

1. Jenkins automatically pulls the latest source code.
2. Backend and frontend dependencies are installed.
3. The application is built and tested.
4. Docker images are created.
5. Images are pushed to Docker Hub.
6. Docker Compose deploys the latest containers.
7. Backend and frontend health checks verify successful deployment.

---

# ✨ Features

- MERN Stack Application
- React + Vite Frontend
- Express.js REST API
- MongoDB Database
- Dockerized Backend & Frontend
- Docker Compose Deployment
- Jenkins CI/CD Pipeline
- Docker Hub Integration
- Automated Health Checks
- Environment Variable Configuration
- Automatic Deployment after GitHub Push

---

# 🏗️ Architecture

```
                 GitHub Repository
                        │
                        ▼
                  Jenkins Pipeline
                        │
      ┌─────────────────┼─────────────────┐
      ▼                 ▼                 ▼
 Install Packages   Build Project    Run Tests
      │
      ▼
 Build Docker Images
      │
      ▼
 Push Images to Docker Hub
      │
      ▼
 Docker Compose Deployment
      │
      ▼
 ┌──────────────┬──────────────┐
 ▼              ▼
Frontend     Backend API
                   │
                   ▼
              MongoDB Database
```

---

# 🛠️ Technology Stack

## Frontend

- React.js
- Vite
- React Router
- Axios

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## DevOps

- Jenkins
- Docker
- Docker Compose
- Docker Hub
- Git
- GitHub

---

# 📁 Project Structure

```
mern-cicd-project/
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── server.js
│   ├── Dockerfile
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── vite.config.js
│   └── package.json
│
├── images/
│   ├── login-page.png
│   ├── jenkins-success.png
│   ├── docker-containers.png
│   └── dockerhub-images.png
│
├── docker-compose.yml
├── Jenkinsfile
├── README.md
└── .gitignore
```

---

# ⚙️ CI/CD Pipeline

The Jenkins pipeline performs the following stages:

- Checkout Source Code
- Install Backend Dependencies
- Install Frontend Dependencies
- Backend Build
- Backend Test
- Frontend Build
- Docker Login
- Build Docker Images
- Push Docker Images
- Deploy Application
- Verify Running Containers
- Backend Health Check
- Frontend Health Check

---

# 📸 Screenshots

## Login Page

![Login Page](images/login-page.png)

---

## Jenkins Pipeline

![Jenkins Pipeline](images/jenkins-success.png)

---

## Docker Containers

![Docker Containers](images/docker-containers.png)

---

## Docker Hub Images

![Docker Hub](images/dockerhub-images.png)

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/vaishnav42/mern-cicd-project.git

cd mern-cicd-project
```

---

## Install Backend

```bash
cd backend

npm install

npm start
```

---

## Install Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Run Using Docker

```bash
docker compose up -d
```

---

# 🔐 Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000

MONGODB_URI=mongodb://host.docker.internal:27017/mern_cicd

JWT_SECRET=your_secret_key
```

---

# 🐳 Docker Images

Backend

```
vaishnav1133/mern-backend:latest
```

Frontend

```
vaishnav1133/mern-frontend:latest
```

---

# 🌐 API Endpoints

## Home

```
GET /
```

Returns:

```json
{
  "success": true,
  "message": "Welcome to MERN CI/CD Backend API"
}
```

---

## Health Check

```
GET /api/health
```

Returns:

```json
{
  "success": true,
  "status": "Backend is running"
}
```

---

# 📊 Skills Demonstrated

- Full Stack Development
- REST API Development
- Docker
- Docker Compose
- Jenkins CI/CD
- Git & GitHub
- Docker Hub
- MongoDB
- Environment Variables
- Deployment Automation
- Health Checks
- Debugging & Troubleshooting

---

# 🔮 Future Improvements

- Deploy on AWS EC2
- Kubernetes Deployment
- Helm Charts
- Terraform
- GitHub Actions
- Prometheus & Grafana Monitoring
- ELK Stack Logging
- Nginx Reverse Proxy

---

# 👨‍💻 Author

**Vaishnav Patil**

GitHub: https://github.com/vaishnav42

Docker Hub: https://hub.docker.com/u/vaishnav1133

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
