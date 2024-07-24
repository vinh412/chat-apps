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
    stage('Push to Docker hub') {
        sh(script: """docker compose -f compose.prod.yml push""", label: "push docker image")
    }
    stage('Deploy to production'){
        def deploying = "#!/bin/bash\n" +
            "cd /ChatApps\n" +
            "docker compose pull\n" +
            "docker compose up > nohup.out 2>&1 &"

        sshagent(credentials: [SSH_CREDENTIALS_ID]){
            sh("""
                scp -o StrictHostKeyChecking=no -r $WORKSPACE/compose.prod.yml root@$PROD_SERVER:/chatapps
            """)
            sh("""
                ssh -o StrictHostKeyChecking=no root@$PROD_SERVER "echo \\\"${deploying}\\\" > deploy.sh && chmod +x deploy.sh && ./deploy.sh"
            """)
        }
    }
}