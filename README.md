# Dockerized Kubernetes Microservices Application

## Project Description
This project demonstrates a **realistic microservices application** deployed on **Kubernetes** using **Minikube**, built with **Dockerized services**.  

It consists of:

- **Frontend**: React application served via Nginx  
- **Backend services**: Node.js applications for Users and Products  
- **Database/Cache**: Redis  
- **Deployment**: Kubernetes Deployments, Services, and Ingress  

The project showcases **DevOps skills** including Docker, Kubernetes, local image management, and Minikube-based deployment.

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
| CI/CD (optional)| GitHub Actions |

---

## Architecture


## Running Locally on Minikube


###1. Start Minikube
    ```
    minikube start
    ```
   
3. Use Minikube’s Docker daemon
    minikube -p minikube docker-env --shell powershell | Invoke-Expression
   
5. Build Docker images
    docker build -t frontend:latest ./frontend
    docker build -t user-service:latest ./user-service
    docker build -t product-service:latest ./product-service
   
7. Apply Kubernetes YAMLs
  Make sure all deployments have imagePullPolicy: Never.
    kubectl apply -f k8s/redis-deployment.yaml
    kubectl apply -f k8s/user-deployment.yaml
    kubectl apply -f k8s/product-deployment.yaml
    kubectl apply -f k8s/frontend-deployment.yaml
    kubectl apply -f k8s/ingress.yaml
   
9. Verify pods are running
    kubectl get pods
    All pods should show 1/1 Running.
   
11. Access Frontend
    minikube service frontend

    
#Challenges / Problems Faced

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



