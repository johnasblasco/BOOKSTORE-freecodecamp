import mongoose from "mongoose";

//make scheme recommended 
const pyramidScheme = mongoose.Schema(
      {
            title: {
              type: String,
              required: true,
            },
            author: {
              type: String,
              required: true,
            },
            publishYear: {
              type: Number,
              required: true,
            },
      },
            
      {
            timestamps: true,
      }
);


export const BOOK = mongoose.model("Book",pyramidScheme)