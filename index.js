const express = require('express');
const crypto = require("crypto");
const app = express();
const Worker = require('webworker-threads').Worker;
const PORT = process.env.PORT || 3000; 

app.get("/", (req,res)=> {
    // declare worker
    const worker = new Worker(function(){
       // thread worker inbound
       // fundtion executed on the worker
        this.onmessage = function() {
        let counter = 0;
        while(counter < 1e9) {
            counter++
        }
        this.postMessage(counter);
       }
    });

    // worker interface inbound message;
    worker.onmessage = function(message){
       console.log(message['data'])
       res.send(''+message['data']) 
     };
    // worker interface outbound message
    worker.postMessage();
    
})

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})