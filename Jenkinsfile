pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Backend') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Install Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                bat 'docker compose build'
            }
        }
    }
}