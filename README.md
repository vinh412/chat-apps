# Deployment
Visit http://chat.vinhdd.io.vn to access the app.
# Requirements
- Docker
- JDK 17 + maven
- Nodejs
# Run app on local
## With Docker
```
cd <project folder>
cp .env.example .env
docker compose build
docker compose up -d
```
Then visit http://localhost
## For develop
### Run database with docker
```
cd <project folder>
docker compose -f compose.dev.yml up -d
```
### Run chat-api
```
cd <project folder/chat-api>
mvn install -DskipTests=true
java -jar -Xmx2048m -Xms256m /target/chat-api-0.0.1-SNAPSHOT.jar
```
### Run chat-server
```
cd <project folder/chat-server>
mvn install -DskipTests=true
java -jar -Xmx2048m -Xms256m /target/chat-server-0.0.1-SNAPSHOT.jar
```
### Run ui
```
cd <project folder/ui>
npm install
npm start
```
then visit http://localhost:3000