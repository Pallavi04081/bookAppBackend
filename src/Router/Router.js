const express = require('express')
const Router = express.Router()
const BooksData = require('../Schema/booksSchema')
const UserRegistation = require('../Schema/RegistrationSchema')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const key = 'abcdefghiklmnop';

Router.post("/login", async (req, res) => {
    try {
        const userData = UserRegistation.find({ username: req.body.username })
        if (!userData) {
            res.status(400).json({
                error: "User Not Registered"
            })
        }
        else {
            const hashedPassword = bcrypt.compare(req.body.passowrd, userData.passowrd)
            if (!hashedPassword) {
                res.status(400).json({
                    error: "Envalid usernmae or passowrd"
                })
            }
            else {
                const Token = jwt.sign({ userData }, key)
                res.json({
                    Token: Token
                })
            }
        }
    }
    catch (error) {
        res.status(400).json({
            error: error
        })
    }
})



Router.post('/Registration',body('password').isLength({ min: 5 }), async (req, res) => {
    const validation = validationResult(req)

    if (!validation.isEmpty()) {
        res.status(400).json({
            error: validation
        })
    }
    else {
        if (req.body.passowrd === req.body.confirmpassowrd) {
            const password = await bcrypt.hash(req.body.password, 10)
            const Result = await UserRegistation.create({
                username: req.body.username,
                passowrd: password,
            })
            res.status(200).json({
                Result: Result
            })
        }
        else {
            res.status(400).json({
                error: "password not match"
            })
        }

    }
})

Router.get("/books", async (req, res) => {
    try {
        const Token = req.headers.Authorization
        let userDeta;
        if (!Token) {
            res.status(400).json({
                message: "please login"
            })
        }
        else {
            userDeta = jwt.verify(Token, key)
        }

        const Result = await BooksData.find({ user: userDeta[0]._id })
        res.json({
            Result: Result
        })
    }
    catch (error) {
        res.status(400).json({
            error: error
        })
    }

})


Router.post("/books", async (req, res) => {
    try {
        const Token = req.headers.Authorization
        let userDeta;
        if (!Token) {
            res.status(400).json({
                message: "please login"
            })
        }
        else {
            userDeta = jwt.verify(Token, key)
        }
        const Result = await BooksData.create({
            title:req.body.title,
            ISBN:req.body.ISBN,
            Author:req.body.Author,
            Describtion:req.body.Describtion,
            publishedDate:req.body.publishedDate,
            publisher:req.body.publisher,
            user:userDeta[0]._id
        })
        res.json({
            Result: Result
        })
    }
    catch (error) {
        res.status(400).json({
            error: error
        })
    }

})



Router.put("/books/update/:id", async (req, res) => {
    try {
        const Token = req.headers.Authorization
        let userDeta;
        if (!Token) {
            res.status(400).json({
                message: "please login"
            })
        }
        else {
            userDeta = jwt.verify(Token, key)
        }
        const Result = await BooksData.findByIdAndUpdate({_id:req.params.id},{
            title:req.body.title,
            ISBN:req.body.ISBN,
            Author:req.body.Author,
            Describtion:req.body.Describtion,
            publishedDate:req.body.publishedDate,
            publisher:req.body.publisher,
            user:userDeta[0]._id
        })
        res.json({
            Result: Result
        })
    }
    catch (error) {
        res.status(400).json({
            error: error
        })
    }

})


Router.delete("/books/delete/:id", async (req, res) => {
    try {
        const Token = req.headers.Authorization
        let userDeta;
        if (!Token) {
            res.status(400).json({
                message: "please login"
            })
        }
        else {
            userDeta = jwt.verify(Token, key)
        }

        const Result = await BooksData.findOneAndDelete({ _id:req.params.id })
        res.json({
            Result: Result
        })
    }
    catch (error) {
        res.status(400).json({
            error: error
        })
    }

})


module.exports = Router;