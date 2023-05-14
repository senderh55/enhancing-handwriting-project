  ![Screen Shot](client/public/favicon.ico)

ScribbleBoost is an academic final project developed by Sender Hodik and Idan Brauner, supervised by Dr. Anat Dahan and Dr. Navit Roth.

We aim to provide occupational therapists a tool for tracking handwriting practices. By using our system, therapists can provide their patients with interactive writing practice while monitoring data and changing parameters.

## Built With

This project uses a variety of technologies to build a full-stack web application. Here's a brief explanation of each one:

Front-end: ReactJS
ReactJS is a popular JavaScript library for building user interfaces. It allows developers to create reusable UI components and manage the state of the application efficiently. ReactJS is widely used for building single-page applications and is known for its high performance and ease of use.

UI Framework: MaterialUI
MaterialUI is a popular React component library that provides pre-built UI components based on Google's Material Design guidelines. It includes a wide range of components such as buttons, forms, cards, and more, that can be easily customized to match the project's design.

Backend: NodeJS
NodeJS is a popular JavaScript runtime environment that allows developers to run JavaScript code outside of the browser. It is widely used for building server-side applications, and its event-driven, non-blocking I/O model makes it highly scalable and efficient.

Database: MongoDB
MongoDB is a popular NoSQL database that stores data in JSON-like documents. It is widely used for building scalable, high-performance web applications, and is known for its flexibility and ease of use.

* []()

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

First, npm should be installed

* npm

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo

```sh
git clone https://github.com/senderh55/enhancing-handwriting-project.git
```
2. In the server folder, create an environment variable file called .env with the following contents:
```sh
MONGODB_URL=<your_mongodb_url>

JWT_SECRET=<your_jwt_secret>

PORT=8000

MAIL_ADDRESS=<your_mail_address>

MAIL_KEY=<your_mail_key>
```

3. Install NPM packages separately in server and client folders
```sh
cd server
npm install
```
```sh
cd client
npm install
```
4. Run the project in each folder using:
```sh
npm start
```



## Usage

