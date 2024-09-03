import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors' // midleware que permite fazer requisiçoes de diferentes origens

const app = express()
app.use(cors())
app.use(express.json())

mongoose.set("strictQuerry", true) // para que as consultas nao certificadas nao sejam permitidas no banco

mongoose.connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const bookSchema = new mongoose.Schema({
    title: String,
    desc: String, // descrição
    price: Number,
    cover: String
})

const Book = mongoose.model("Book", bookSchema)

app.get("/books", async (req, res) => {
    try {
        const books = await Book.find()
        res.json(books)
    } catch (err) {
        res.status(500).json(err)
    }
})


app.get("/books/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        if(book){
            res.json(book)
        }else{
            res.status(400).json({message: "Livro não encontrado"})
        }
        res.json(books)
    } catch (err) {
        res.status(500).json(err)
    }
})

app.post("/books", async (req, res) => {
    try {
        const newBook = new Book(req.body)
        const saveBook = await newBook.save()
        res.json(saveBook)
    } catch (err) {
        res.status(500).json(err)
    }
})

app.put("/books/:id", async (req, res) => {
    try {
        const updateBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.json(updateBook)
    } catch (err) {
        res.status(500).json(err)
    }
})

app.delete("/books/:id", async (req, res) => {
    try {
        const deleteBook = await Book.findByIdAndDelete(req.params.id)
        res.json(deleteBook)
    } catch (err) {
        res.status(500).json(err)
    }
})

app.listen(8800, () => {
    console.log("Back-end Conectado")
})

