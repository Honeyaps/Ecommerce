const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { Adminlogin } = require("../db.js");

require("dotenv").config();
const adminRouter = express.Router();

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

const adminValidator = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});

adminRouter.use(express.json());

// for admin signin
adminRouter.post("/signin",async (req, res) => {
  const body = req.body;
  const success = adminValidator.safeParse(body);

  if (!success) {
    return res.status(403).json({
      msg: "Invalid inputs"
    });
  }

  const { email, password } = body;

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(403).json({
      msg: "Invalid credentials",
    });
  }

  try {
    const admin = await Adminlogin.findOne({ email: adminEmail });

    if (!admin) {
      return res.status(404).json({
        msg: "Admin not found",
      });
    }

    const token = jwt.sign({ id: admin._id.toHexString() },process.env.SECRET);

    return res.json({ token : token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error while signing in",
    });
  }
});


module.exports = adminRouter;
