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

        stage('Frontend Lint') {
            steps {
                dir('frontend') {
                    sh 'npm run lint'
                }
            }
        }

        stage('Frontend Test') {
            steps {
                dir('frontend') {
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
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
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
            docker compose down || true
            docker compose pull
            docker compose up -d
        '''
    }
}

        stage('Verify Running Containers') {
            steps {
                sh 'docker ps'
            }
        }

        stage('Backend Health Check') {
            steps {
                sh '''
                    sleep 15
                    curl -f http://localhost:5000 || exit 1
                '''
            }
        }

        stage('Frontend Health Check') {
            steps {
                sh '''
                    sleep 15
                    curl -f http://localhost:5173 || exit 1
                '''
            }
        }
    }

    post {

        success {
            echo '==========================================='
            echo 'Pipeline Completed Successfully!'
            echo '==========================================='
        }

        failure {
            echo '==========================================='
            echo 'Pipeline Failed!'
            echo 'Check Console Output.'
            echo '==========================================='
        }

        always {
            cleanWs()
        }
    }
}