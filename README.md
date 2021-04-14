# WebApp_01

This is a simple web app runs on NodeJS that can be used as a template to start building a new web application. Application is 
designed to store the users data and contents in a MongoDB and uses [Passport](http://www.passportjs.org) as authentication framework with [passport-local](http://www.passportjs.org/packages/passport-local/) strategy. 

Below are the commands I used to setup (as Administrator) an instance of MongoDB in Windows 10 PC.

Install MongoDB as a service.

```
C:\mongodb\bin\mongod --directoryperdb --dbpath  C:\mongodb\data\db --logpath C:\mongodb\log\mongo.log --logappend  --config  C:\mongodb\bin\mongod.cfg --install --serviceName MongoDB
```

Start database.

```
net start MongoDB
```

Start app. 

```
nodemon app.js
```

Open url localhost:5000
Register a new user
Login to app
Add new idea using Video Ideas -> Add Idea

Use following commands to interact with databases and collections.

```
cd C:\mongodb\bin
mongo
show dbs
use vidjot-dev
db.users.find()
```
