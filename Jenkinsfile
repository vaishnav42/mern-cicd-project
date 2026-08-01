pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "mern-backend"
        FRONTEND_IMAGE = "mern-frontend"
    }

    stages {

        stage('Checkout Source') {
            steps {
                checkout scm
            }
        }

        stage('Backend Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Frontend Dependencies') {
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

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    bat 'npm run build'
                }
            }
        }

        stage('Backend Tests') {
            steps {
                dir('backend') {
                    bat 'npm test'
                }
            }
        }

        stage('Frontend Tests') {
            steps {
                dir('frontend') {
                    bat 'npm test'
                }
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker compose build'
            }
        }

        stage('Docker Deploy') {
            steps {
                bat 'docker compose up -d'
            }
        }

        stage('Docker Status') {
            steps {
                bat 'docker ps'
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