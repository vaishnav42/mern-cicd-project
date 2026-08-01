pipeline {
    agent any

    environment {
        DOCKER_BACKEND = "vaishnav1133/mern-backend:latest"
        DOCKER_FRONTEND = "vaishnav1133/mern-frontend:latest"
    }

    options {
        timestamps()
        disableConcurrentBuilds()
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
                    bat 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Backend Build') {
            steps {
                dir('backend') {
                    bat 'npm run build'
                }
            }
        }

        stage('Backend Test') {
            steps {
                dir('backend') {
                    bat 'npm test'
                }
            }
        }

        stage('Frontend Lint') {
            steps {
                dir('frontend') {
                    bat 'npm run lint'
                }
            }
        }

        stage('Frontend Test') {
            steps {
                dir('frontend') {
                    bat 'npm test'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    bat 'npm run build'
                }
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                bat 'docker build -t %DOCKER_BACKEND% backend'
                bat 'docker build -t %DOCKER_FRONTEND% frontend'
            }
        }

        stage('Push Docker Images') {
            steps {
                bat 'docker push %DOCKER_BACKEND%'
                bat 'docker push %DOCKER_FRONTEND%'
            }
        }

        stage('Deploy Application') {
            steps {
                bat 'docker compose down'
                bat 'docker compose up -d --build'
            }
        }

        stage('Verify Running Containers') {
            steps {
                bat 'docker ps'
            }
        }

        stage('Backend Health Check') {
            steps {
                bat 'curl http://localhost:5000'
            }
        }

        stage('Frontend Health Check') {
            steps {
                bat 'curl http://localhost:5173'
            }
        }
    }

    post {

        success {
            echo '==========================================='
            echo ' CI/CD Pipeline Completed Successfully!'
            echo '==========================================='
        }

        failure {
            echo '==========================================='
            echo ' Pipeline Failed!'
            echo ' Check Console Output for Details.'
            echo '==========================================='
        }

        always {
            cleanWs()
        }
    }
}