# HealthStack App Server

This app is the application server for HealthStack, it is powered by Expressjs, Socket.IO and the CouchBase SDK which allows it to communicate with a CouchBase database.

## CouchBase Database Setup

* Navigate to the [CouchBase DockerHub](https://hub.docker.com/_/couchbase) page.
* Pull the official CouchBase docker image with the following command, `docker pull couchbase`
* Assuming you have Docker installed on your system, run `docker run -d --name healthstack -p 8091-8094:8091-8094 -p 11210:11210 couchbase` on the terminal.
* To check if your container is running, execute `docker ps -a` in your terminal. Check if the status of a container named *healthstack* is *UP*.
* Next, go to your browser and navigate to `http://localhost:8091`. This will redirect you to the database setup page.
* On the database setup page, create an account with the following details: 
  * Cluster name: *healthstack*
  * User: *Administrator*
  * Password: *fomeneodiwuor*
* After the above step, you should be redirected to a dashboard where you should create a **bucket** for Centre Pasteur (my lab) called *centre-pasteur-yaounde*.
* This concludes the database setup.

## Expressjs Server Setup

* For starters, clone repository for the app by issuing the following command in your terminal, `git clone https://github.com/vladimirfomene/healthstack-backend.git`.
* Navigate to the project directory and run `npm install` to install the project's dependencies.
* Once that is done, run the app by executing `npm run start` on the commandline.
* With that you should now be able access the routes defined in app.js and write to the database.
