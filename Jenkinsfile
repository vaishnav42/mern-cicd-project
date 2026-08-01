pipeline {
    agent any

    stages {

        stage('Checkout') {
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

        stage('Build Backend Docker Image') {
            steps {
                bat 'docker build -t mern-backend ./backend'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                bat 'docker build -t mern-frontend ./frontend'
            }
        }
    }
}