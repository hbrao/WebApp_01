# WebApp_01

This is a simple web app runs on NodeJS that can be used as a template to start building a new web application. Application is 
designed to store the users data and contents in a MongoDB and uses Passport as authentication framework. 

Below are the commands I used to setup (as Administrator) an instance of MongoDB in Windows 10 PC.

Install MongoDB as a service.

```
C:\mongodb\bin\mongod --directoryperdb --dbpath  C:\mongodb\data\db --logpath C:\mongodb\log\mongo.log --logappend  --config  C:\mongodb\bin\mongod.cfg --install --serviceName MongoDB
```

Start database.

```
net start MongoDB
```

Launch CLI  and type ```help``` to know the available commands to interact with databases and collections.

```
C:\mongodb\bin\mongo
```
