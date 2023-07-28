## Orquestación con KUBERNETES, plataforma para administración de cargas y servicios Docker
### Kubernetes opera con el concepto de pods, cada pod con n contenedores que pueden intercomunicarse.

Instalación Kubernetes:
- Sitio oficial: https://kubernetes.io/
- Instalación bajo Linux: https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/
- Instalación bajo Mac: https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/
- Instalación bajo Windows: curl.exe -LO "https://dl.k8s.io/release/v1.27.3/bin/windows/amd64/kubectl.exe"
- Verificar instalación desde consola con: kubectl version --client

Kubernetes es un servicio diseñado para operar en la nube, pero podemos probarlo localmente con un gestor de clusters como Minikube.

Instalación Minikube:
- Usando Chocolatey (suele instalarse junto con Node): choco install minikube
- Para instalar Chocolatey por separado: https://gist.github.com/krayfaus/2a68fbc7386d3cdbcb45c577b1d4bae8
- Instalación Minikube desde Powershell: https://minikube.sigs.k8s.io/docs/start/
- Verificar instalación desde consola con: minikube --help para verificar

Corriendo un cluster local:
- Iniciar el cluster: minikube start (descargará los archivos necesarios de Kubernetes e iniciará)
- Verificar estado por consola: kubectl cluster-info (no atender mensaje de desactualización).
- Verificar estado con Docker Desktop: aparecerá un container y un volumen de minikube activos. (un volúmen de Docker es simplemente un directorio fuera del contenedor que es montado dentro del contenedor en una ruta específica, y sirve para persistir datos entre detenciones y reinicios del contenedor).
  
Primer deploy con Kubernetes (apoyarse en slides de presentación):
Estamos con un cluster local de Kubernetes levantado mediante minikube, pero "vacío", no tenemos pods activos aún. Para activar, necesitamos hacer un deploy de alguna imagen, y para ello partiremos desde un archivo yaml de configuración, en el cual haremos referencia a la imagen que hemos cargado previamente en nuestra cuenta de DockerHub.

- Más info del formato de archivos YAML: https://www.cloudbees.com/blog/yaml-tutorial-everything-you-need-get-started
- Armar archivo de config: ver artillery_deploy.yml.
- Correr config para activar cluster: kubectl apply -f artillery_deploy.yml

Listar namespaces, deployments, pods, services:
- kubectl get namespaces
- kubectl get deployments
- kubectl get pods
- kubectl get services

Reiniciar deployment
- kubectl rollout restart deployment <nombre_del_deploy>

Listar servicios disponibles para minikube:
- minikube service list

Iniciar servicio:
- minikube service <nombre_del_servicio>

Detener servicio:
Recordar que minikube es solo una implementación para Kubernetes local. Para detener un servicio en Kubernetes, normalmente lo que se hace es:

- Bajar a cero las réplicas, el cluster queda vacío:kubectl scale deployment <nombre_del_deploy> --replicas=0
- Borrar el deployment: kubectl delete deployment <nombre_del_deploy>

Ejemplo de servicio en la nube:
- https://www.linode.com/docs/guides/deploy-container-image-to-kubernetes/

Más sobre Kubernetes:
- https://www.youtube.com/watch?v=s_o8dwzRlu4