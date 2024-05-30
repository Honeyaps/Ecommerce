const exprees = require("express");
const zod = require("zod");
const jwt = ("jsonwebtoken");
const bcrypt = require("bcryptjs")
const { User } = require("../db")

require("dotenv").config()
const userRouter = exprees.Router();

const validation = zod.object({
    name: zod.string(),
    email: zod.string(),
    password: zod.string().min(6)
})

// for signup
userRouter.post("/signup",async(req,res)=>{
    const body = req.body;
    const valid = validation.safeParse(body);

    


})

