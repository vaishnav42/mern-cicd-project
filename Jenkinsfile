pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "vaishnav1133/mern-backend:latest"
        FRONTEND_IMAGE = "vaishnav1133/mern-frontend:latest"
    }

    options {
        timestamps()
    }

    stages {

        stage('Checkout Source') {
            steps {
                checkout scm
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Backend Build') {
            steps {
                dir('backend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Backend Test') {
            steps {
                dir('backend') {
                    sh 'npm test'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh """
                docker build -t ${BACKEND_IMAGE} ./backend
                docker build -t ${FRONTEND_IMAGE} ./frontend
                """
            }
        }

        stage('Push Docker Images') {
            steps {
                sh """
                docker push ${BACKEND_IMAGE}
                docker push ${FRONTEND_IMAGE}
                """
            }
        }

        stage('Deploy Application') {
            steps {
                sh '''
                docker compose down --remove-orphans || true

                docker rm -f mern-backend mern-frontend 2>/dev/null || true

                docker compose pull

                docker compose up -d --force-recreate --remove-orphans
                '''
            }
        }

        stage('Verify Running Containers') {
            steps {
                sh '''
                sleep 10
                docker ps
                '''
            }
        }

        stage('Backend Health Check') {
            steps {
                sh '''
                echo "Waiting for Backend..."
                sleep 30

                curl --retry 10 \
                     --retry-delay 5 \
                     --retry-connrefused \
                     -f http://localhost:5000/api/health
                '''
            }
        }

        stage('Frontend Health Check') {
            steps {
                sh '''
                echo "Waiting for Frontend..."
                sleep 20

                curl --retry 10 \
                     --retry-delay 5 \
                     --retry-connrefused \
                     -f http://localhost:5173
                '''
            }
        }
    }

    post {

        success {
            echo "======================================="
            echo "Pipeline Completed Successfully"
            echo "======================================="
        }

        failure {
            sh 'docker ps -a || true'
            sh 'docker logs mern-backend || true'
            sh 'docker logs mern-frontend || true'

            echo "======================================="
            echo "Pipeline Failed"
            echo "======================================="
        }

        always {
            cleanWs()
        }
    }
}