# Dockerized Kubernetes Microservices Application

## Project Description

For this project, I built a **realistic microservices application** from scratch and deployed it on **Kubernetes** using **Minikube**. I created separate folders for each service — **frontend** and **backend** — and wrote the application code myself.  

The stack includes:

- **Frontend:** A React application served via Nginx  
- **Backend Services:** Node.js applications for Users and Products  
- **Database/Cache:** Redis for fast data access  
- **Deployment:** Kubernetes Deployments, Services, and Ingress for orchestration and service exposure  

The project demonstrates my hands-on skills with **Docker containerization**, **Kubernetes orchestration**, local image management, and deploying a full microservices architecture using Minikube.

---

## Tools & Technologies Used

| Component        | Technology / Tool |
|-----------------|------------------|
| Frontend        | React, npm, Nginx |
| Backend         | Node.js, Express |
| Database/Cache  | Redis |
| Containerization | Docker |
| Orchestration   | Kubernetes |
| Local Cluster   | Minikube |
| Deployment      | Kubernetes Deployments, Services, Ingress |

---

## Running Locally on Minikube


### 1. Start Minikube
    ```
    minikube start
    ```
   
### 2. Use Minikube’s Docker daemon
    minikube -p minikube docker-env --shell powershell | Invoke-Expression
   
### 3. Build Docker images
    docker build -t frontend:latest ./frontend
    docker build -t user-service:latest ./user-service
    docker build -t product-service:latest ./product-service

### 4. Apply Kubernetes YAMLs
    kubectl apply -f k8s/redis-deployment.yaml
    kubectl apply -f k8s/user-deployment.yaml
    kubectl apply -f k8s/product-deployment.yaml
    kubectl apply -f k8s/frontend-deployment.yaml
    kubectl apply -f k8s/ingress.yaml 
   Make sure all deployments have imagePullPolicy: Never.
   
### 5. Verify pods are running
    kubectl get pods
    All pods should show 1/1 Running.
   
### 6. Access Frontend
    minikube service frontend

### The workflow will be:

1. Application Code: Created separate folders for frontend and backend services with their respective application code.
2. Dockerization: Wrote Dockerfiles for each service to containerize the applications.
3. Minikube Setup: Used Minikube to run a local Kubernetes cluster.
4. Build & Deploy: Built Docker images locally (inside Minikube’s Docker environment), then deployed the services as Kubernetes Pods using Deployments.
5. Service Exposure: Exposed each service using Kubernetes Services, and configured an Ingress to route traffic to the frontend and backend.
6. Outcome: All services ran successfully as pods, the frontend became accessible via Minikube URL, and the backend services communicated internally with Redis.

    
# Challenges / Problems Faced

During development and deployment, several issues were encountered and resolved:

1. React build errors in Docker
    Fixed by ensuring public and src folders are copied correctly before npm run build.

2. index.html and index.js not found
    Caused by incorrect folder structure / Dockerfile paths.

3. Windows vs Linux shell commands
    eval $(minikube docker-env) doesn’t work on Windows CMD.
    Resolved using PowerShell: minikube -p minikube docker-env --shell powershell | Invoke-Expression.

4. ImagePullBackOff / ErrImagePull
    Kubernetes couldn’t see locally built Docker images.
    Fixed by setting imagePullPolicy: Never in deployments and building images inside Minikube Docker.

5. Service unreachable at Minikube URL
    Occurred when frontend was running but backend pods weren’t.
    Fixed by rebuilding backend images inside Minikube and reapplying deployments.

6. Using Minikube’s Docker environment
    Essential to ensure Kubernetes uses local images instead of trying to pull from Docker Hub.











