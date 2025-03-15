# Projet DevOps - Docker & Kubernetes

Ce projet implémente une API backend simple avec Node.js et Express qui se connecte à une base de données MongoDB. Le projet est conçu pour être déployé en utilisant Docker et Kubernetes.

## Contenu du projet

- API Backend en Node.js/Express
- Base de données MongoDB
- Configuration Docker pour déploiement local
- Manifestes Kubernetes pour déploiement sur cluster

## Prérequis

Pour exécuter ce projet, vous aurez besoin de:

- Docker et Docker Compose
- Kubernetes (Minikube, Docker Desktop avec Kubernetes, ou un cluster distant)
- kubectl (outil en ligne de commande Kubernetes)

## Structure du projet

```
projet-devops/
│
├── app.js                     # Code source de l'API
├── package.json               # Dépendances Node.js
├── package-lock.json          # Versions précises des dépendances
├── .env                       # Variables d'environnement
├── Dockerfile                 # Instructions pour la construction de l'image Docker
├── docker-compose.yaml        # Configuration Docker Compose
├── README.md                  # Documentation du projet
│
└── kubernetes/                # Manifestes Kubernetes
    ├── backend-deployment.yaml
    ├── backend-service.yaml
    ├── mongo-deployment.yaml
    ├── mongo-service.yaml
    └── mongo-pvc.yaml
```

## Fonctionnalités de l'API

L'API fournit deux endpoints principaux:

1. `GET /api/tasks`: Récupérer toutes les tâches
2. `POST /api/tasks`: Créer une nouvelle tâche

Format de données pour créer une tâche:
```json
{
  "title": "Titre de la tâche",
  "description": "Description détaillée de la tâche",
  "completed": false
}
```

## Exécution locale avec Docker Compose

Pour démarrer l'application et la base de données localement:

1. Clonez ce dépôt:
```bash
git clone https://github.com/magatte365/projet-devops.git
cd projet-devops
```

2. Lancez les conteneurs avec Docker Compose:
```bash
docker-compose up -d
```

3. L'API sera accessible à l'adresse: http://localhost:3000

4. Pour arrêter les conteneurs:
```bash
docker-compose down
```

## Test de l'API

### Avec un navigateur web
- Accédez à http://localhost:3000/api/tasks pour voir toutes les tâches (méthode GET)

### Avec Postman
1. Pour lister les tâches:
   - Méthode: GET
   - URL: http://localhost:3000/api/tasks

2. Pour créer une tâche:
   - Méthode: POST
   - URL: http://localhost:3000/api/tasks
   - Headers: Content-Type: application/json
   - Body (raw, JSON):
   ```json
   {
     "title": "Nouvelle tâche",
     "description": "Description de la tâche",
     "completed": false
   }
   ```

### Avec PowerShell
```powershell
# Pour lister les tâches
Invoke-WebRequest -Uri http://localhost:3000/api/tasks -Method GET | Select-Object -ExpandProperty Content | ConvertFrom-Json

# Pour créer une tâche
Invoke-WebRequest -Method POST -Uri http://localhost:3000/api/tasks -ContentType "application/json" -Body '{"title":"Nouvelle tâche","description":"Description de la tâche","completed":false}'
```

### Avec curl (Linux/Mac)
```bash
# Pour lister les tâches
curl http://localhost:3000/api/tasks

# Pour créer une tâche
curl -X POST -H "Content-Type: application/json" -d '{"title":"Nouvelle tâche","description":"Description de la tâche","completed":false}' http://localhost:3000/api/tasks
```

## Déploiement sur Kubernetes

Pour déployer l'application sur un cluster Kubernetes:

1. Assurez-vous que votre image Docker est disponible:
   - Si vous utilisez Minikube, vous pouvez utiliser l'image locale
   - Sinon, publiez votre image sur Docker Hub:
   ```bash
   docker build -t magatte365/backend:v1.0.0 .
   docker push magatte365/backend:v1.0.0
   ```

2. Appliquez les manifestes Kubernetes:
   ```bash
   kubectl apply -f kubernetes/
   ```

3. Vérifiez le déploiement:
   ```bash
   kubectl get pods
   kubectl get services
   ```

4. Pour accéder à l'API:
   ```bash
   kubectl port-forward service/backend-service 8080:3000
   ```
   L'API sera accessible à l'adresse: http://localhost:8080

5. Testez l'API déployée sur Kubernetes:
   ```powershell
   # Pour lister les tâches
   Invoke-WebRequest -Uri http://localhost:8080/api/tasks -Method GET | Select-Object -ExpandProperty Content | ConvertFrom-Json

   # Pour créer une tâche
   Invoke-WebRequest -Method POST -Uri http://localhost:8080/api/tasks -ContentType "application/json" -Body '{"title":"Kubernetes Task","description":"This is a task created on Kubernetes","completed":false}'
   ```

## Nettoyage

Pour arrêter et supprimer les conteneurs Docker:
```bash
docker-compose down
```

Pour supprimer les ressources Kubernetes:
```bash
kubectl delete -f kubernetes/
```

## Dépannage

### Problèmes de connexion à MongoDB
Si l'API ne peut pas se connecter à MongoDB, vérifiez:
- Que les conteneurs MongoDB sont en cours d'exécution
- Que les variables d'environnement sont correctement configurées
- Que les services Kubernetes sont correctement configurés

### Problèmes avec les conteneurs Docker
Pour voir les logs des conteneurs:
```bash
docker-compose logs
```

### Problèmes avec Kubernetes
Pour voir les logs des pods:
```bash
kubectl get pods
kubectl logs <nom-du-pod>
```

### Si le service backend n'est pas accessible sur Kubernetes
Si vous ne pouvez pas accéder à l'API via port-forward, vérifiez la configuration du service:
```bash
kubectl get services
kubectl describe service backend-service
```

Assurez-vous que le port du service correspond au port de l'application (3000).