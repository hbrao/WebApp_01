# [Node.js, Express and MongoDB](https://learning.oreilly.com/videos/node-js-express-and/9781789535952)

This is a simple web app runs on NodeJS that can be used as a template to start building a new web application. Application is 
designed to store the users data and contents in a MongoDB and uses [Passport](http://www.passportjs.org) as authentication framework with [passport-local](http://www.passportjs.org/packages/passport-local/) strategy. 

Below are the instructions to setup and play with the web application. 


## MongoDB Setup
### Windows

Open command prompt (as Administrator) and install MongoDB as a service.

```
C:\mongodb\bin\mongod --directoryperdb --dbpath  C:\mongodb\data\db --logpath C:\mongodb\log\mongo.log --logappend  --config  C:\mongodb\bin\mongod.cfg --install --serviceName MongoDB
```

Start service.

```
net start MongoDB
```

### Linux

```
docker container run -d --name mongo_db -p  27017:27017  -v /tmp/mongo:/data/db mongo
```

## Start app. 

```
cd %HOMEPATH%/WebApp_01
npm i -g nodemon
npm install
nodemon app.js
```

* Open url http://localhost:5000
* Register a new user
* Login to app
* Add new idea using Video Ideas -> Add Idea

## Use following commands to interact with databases and collections.

```
cd C:\mongodb\bin
mongo
show dbs
use vidjot-dev
db.users.find()
```


For futher learning refer https://learning.oreilly.com/videos/node-js-api-masterclass/9781800569638/
