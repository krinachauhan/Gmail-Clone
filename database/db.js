import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Connection = () => {
    
    const DB_URI= `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-r9wexj0-shard-00-00.qfujvhl.mongodb.net:27017,ac-r9wexj0-shard-00-01.qfujvhl.mongodb.net:27017,ac-r9wexj0-shard-00-02.qfujvhl.mongodb.net:27017/?ssl=true&replicaSet=atlas-ugfntt-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Gmail-Clone`;
    console.log('Database Connected Succesfully');
    try{
        mongoose.connect(DB_URI);
    }catch(error){
        console.log('Error while connecting with database ', error.message);
    }
}
export default Connection;