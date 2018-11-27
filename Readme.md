 ## Example of distributed tracing in Microservices
 
 #### Services includes card, balance and transfer
 
 #### Using Docker (Running for the first time) ####
 - cd to servers and run `docker-compose up`
 - cd to docker-zipkin and run `docker-compose up` 
 - cd to each service (balance, card, transfer) and run `docker-compose up`
 
 Then you are good.
 
 #### Start Existing Container ####
 - open your terminal and run `docker start mysqldb rabbitmq zipkin storage`
 - cd to each service (balance, card, transfer) and run `docker-compose up`
 
 ## Extra
  - On you browser go to [localhost:port](http://127.0.0.1:80)
 
 ### To change port
  - Open the docker-compose.yml. you see ports key with value e.g: `85:80` 
  - Change the prefix 85 to any port of your choice `e.g 85:80`
  - Run `docker-compose up` to build and start the app.
 
 Zipkin is used for tracing and logging and Rabbitmq RPC for (Pub/Sub)
 
 ### Card API Documentation
 Check the api documentation [here](https://documenter.getpostman.com/view/1419985/RzZFBbjy)