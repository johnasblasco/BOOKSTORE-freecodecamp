import express from "express";
import { BOOK } from "../models/book.js";
import { what_if } from "../ninja.js";

const router = express.Router();


router.post("/", async (penge,oh_eto)=>{
      try {
            what_if((
                  !penge.body.title ||
                  !penge.body.author ||
                  !penge.body.publishYear

            ), ()=>{
                  return oh_eto.status(400).send({message: "send mo boy title author pati publishyear"})
            })

            const newBOOK ={
                  title : penge.body.title,
                  author : penge.body.author,
                  publishYear : penge.body.publishYear
            }

            const book = await BOOK.create(newBOOK);
            return oh_eto.status(201).send(book);

      } catch (error) {
            oh_eto.status(569).send("boy may error ka gago")
      }
})





router.get("/", (req, res)=>{  
      
      // then / promises
      BOOK.find({})
      .then(result => {
            res.json(
            {     count: result.length,
                  data : result,
            }
            );
      })
      .catch(err => {
            res.json(err);
      });

})

// with id

router.get("/:id",(req, res)=>{  

      const {id} = req.params
      // then / promises
      BOOK.findById(id)
      .then(result => {
            res.json(
            {     count: result.length,
                  data : result,
            }
            );
      })
      .catch(err => {
            res.json(err);
      });

})

router.put("/:id", async(req, res) => {
      try {
            what_if((
                  !req.body.title ||
                  !req.body.author ||
                  !req.body.publishYear

            ), ()=>{
                  return res.status(400).send({message: "send mo lahat to boy title author pati publishyear"})
            })

            const {id} = req.params;

            const result = await BOOK.findByIdAndUpdate(id, req.body)

            if(!result){
                  return res.status(404).jsong({message: 'book not found'})
            }

            return res.status(200).send({message: 'Book updated successfully'})

      } catch (error) {
            console.log("error sa update")
            req.status(500).send({message: error.message})
      }
})

router.delete("/:id", async(request, response) => {
      try {
            const { id } = request.params;

            const result = await BOOK.findByIdAndDelete(id);

            if (!result) {
                  return response.status(404).json({ message: "Book not found" });
            } else {
                  return response.status(200).send({ message: "Book is successfully deleted" });
            }
                
 
      } catch (error) {
            console.log("error boy")
            request.status(500).send({message: error.message})
      }
})

export default router