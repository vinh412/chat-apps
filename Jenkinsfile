DOCKERHUB_USER = 'vinh412'
DOCKERHUB_CREDENTIALS_ID = 'vinh412-docker-hub'
GITHUB_URL = "https://github.com/vinh412/chat-apps.git"
GIT_BRANCH = 'master'
SSH_CREDENTIALS_ID = 'jenkins-ssh-key'
PROD_SERVER = 'chat.vinhdd.io.vn'

node {
    stage('Initialise') {
        checkout scmGit(
            branches: [[name: GIT_BRANCH]],
            userRemoteConfigs: [[
                url: GITHUB_URL
            ]]
        )
        echo WORKSPACE
    }
    stage('Build and Packaging') {
        sh(script: """docker compose -f compose.prod.yml build""", label: "build docker image")
    }
    stage('Push to Docker Hub') {
        withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS_ID, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]){
            sh(script: """echo $PASSWORD | docker login -u $USERNAME --password-stdin""", label: "login to docker hub")
            sh(script: """docker compose -f compose.prod.yml push""", label: "push docker image")
        }
    }
    stage('Deploy to production'){
        def deploying = "#!/bin/bash\n" +
            "cd /chatapps\n" +
            "docker compose -f compose.prod.yml pull\n" +
            "docker compose -f compose.prod.yml up > nohup.out 2>&1 &"

        sshagent(credentials: [SSH_CREDENTIALS_ID]){
            sh("""
                ssh -o StrictHostKeyChecking=no root@$PROD_SERVER "echo \\\"${deploying}\\\" > deploy.sh && chmod +x deploy.sh && ./deploy.sh"
            """)
        }
    }
}