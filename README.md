# wechat
Simple real time chat application with Spring boot and Angular 4

# Prerequisites
- Java 8
- Maven
- NodeJS
- Angular CLI

# Functional summary
- The backend is a Spring boot application which exposes Rest API for login / logout feature. It does not use Spring security for authentication. The login feature is only registering the user in the database (In memory database). The backend enables STOMP messaging over Websocket to allow two-way communication between the backend and frontend.

- The frontend is an Angular 4 application which has a simple login page where the user can connect to the chat room. The chat room displays the list of connected users and once the user clicks on a user in the list, they can start to send / receive messages between each other in real time.

# Setup

### Backend
	- Go to backend folder:
		$ cd wechat-backend
	- Run the following maven command:
		$ mvn spring-boot:run
	The port 8080 is used so please make sure that it is not used by another process
	
### Frontend
	 - Ensure that nodeJS and angular-cli are both installed
	 - Go to frontend folder:
		$ cd wechat-frontend
	 - Run the following command to install the dependencies and the current package context:
		$ npm install
	 - Run a dev server with the following command:
		$ ng serve
	The port 4200 is used so please make sure that it is not used by another process
	Go to the browser and navigate to http://localhost:4200
