import express, { request, response } from "express";
import {_, __ } from './config.js'
const app = express();
import mongoose from "mongoose";
import bookRoutes from './routes/bookRoutes.js'
import cors from 'cors';

app.use(cors())

app.use(express.json());
app.use('/books',bookRoutes)


app.get(('/'), (req,res)=>{
      res.send("Welcome to the backend please check localhost:8000/books")
})

export const CTD = async () => {
      try {
        await mongoose.connect(_);
        console.log("app connected to the database");
        app.listen(__,()=>{
            console.log(`the backend has started running on port: ${__}`)
      })
      } catch (error) {
        console.log("app is not connected to the database");
        
      }
}
CTD();

