import app from "."
import mongoose from "mongoose"
import * as dotenv from 'dotenv';

dotenv.config();

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(result=>{        
        if(result){
            void app.listen({host:"0.0.0.0",port:process.env.PORT})  
            return {connectionStatus:true}
        }
    })
    .then((status)=>{
        console.log(`connection status is ${status?.connectionStatus}`);
    })
    .catch(exception=>{
        console.error(exception)
    })