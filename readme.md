<h1 align="center">Multilanguage - Node.js</h1>

## About 🎯

This is the Node.js backend of the multilanguage project, whose main objective is to perform basic CRUD operations (Create, Read, Update and Delete) of ``users``, ``projects`` and ``technologies``. As a differential, it will be possible for the frontend to choose in which language the backend should run.

## Features 🌟

- [x] `` Users``
- [x] ``Technologies``
- [x] ``Projects``

## Technologies 🚀
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## Database Model 💾

<img src="https://github.com/VictorGVC/ProjectMultilanguage-Node/blob/main/doc/database.png">

## Long Description 🧾

This NodeJS repository is a part of the multilanguage project, whose main objective is to manage data, performing basic CRUP operations. In this project I decided to control ``users`` and ``projects`` to store my projects with my personal data like a portfolio.

To achieve the objective I used:
- ``Node.JS`` as runtime to ``Javascript``;
- ``Express.JS`` to help create the api;
- ``Consign`` to autoload scripfiles, simplifying the process of exporting and importing modules;
- ``Bcrypt`` to encrypt passwords at signin and signup;
- ``JWT`` for secure session control;
- ``Passport`` to encrypt and decrypt the JWT token;
- ``PostgreSQL`` as relational database system;
- ``Knex`` as SQL query builder and migrations manager;
- ``Cors`` to make secure cross-origin requests and responses.
- ``Postman`` as API client to make tests
- ``Heroku`` as cloud CI/CD

## How to use 👨‍💻

This Node.JS backend was made to work with <a href="https://github.com/VictorGVC/ProjectMultilanguage-React">Frontend React</a>, but if you want to use it by yourself you can use an API client using the routes below and following the instructions for each one.

### Routes

In this session will be discribed all routes to access the software functions with the corresponding instructions.

#### Signup
``multilanguage-node.herokuapp.com/signup``

First of all you need to register, because This project have a session control, if you don't you won't be able to access any other system function. To do this it's necessary to send via post a body with the username, password and confirmPassword fields to the Route above, the password and confirmPassword fields must be identical or it will return an error.

Example:
```json
{
    "username": "VictorGVC",
    "password": "123456",
    "confirmPassword": "123456"
}
```

In case of success, the API will return status 201 with the message:
```User saved```



## License 📝

[![Licence](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE)
