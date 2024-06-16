const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, Cart, Order } = require("../db");
const { sendEmail } = require("./nodemailer");
const Auth = require("../Auth/middleware");

require("dotenv").config();
const userRouter = express.Router();

const validation = zod.object({
  name: zod.string(),
  email: zod.string(),
  password: zod.string().min(6),
});

// for signup
userRouter.post("/signup", async (req, res) => {
  const body = req.body;
  const valid = validation.safeParse(body);

  if (!valid) {
    res.status(403).json({ msg: "invalid data" });
  }

  const salt = await bcrypt.genSalt(6);
  const securePass = await bcrypt.hash(body.password, salt);

  const check = await User.findOne({
    email: body.email,
  });

  if (check) {
    res.status(403).json({ msg: "email already exist" });
  }

  try {
    const response = await User.create({
      name: body.name,
      email: body.email,
      password: securePass,
    });

    const token = jwt.sign(response._id.toHexString(), process.env.SECRET);

    return res.json({
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: "error while signing up" });
  }
});

// for Signin
userRouter.post("/signin", async (req, res) => {
  const body = req.body;
  const valid = validation.safeParse(body);

  if (!valid) {
    return res.status(403).json({ msg: "invalid data" });
  }

  try {
    const check = await User.findOne({
      email: body.email,
    });

    if (!check) {
      return res.status(403).json({ msg: "incorrect email" });
    }

    const passcmpr = await bcrypt.compare(body.password, check.password);

    if (passcmpr) {
      const token = jwt.sign(check._id.toHexString(), process.env.SECRET);
      return res.json({
        name: check.name,
        token: token,
      });
    } else {
      return res.status(403).json({ msg: "incorrect password" });
    }
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: "error while signing in" });
  }
});

// for otp
userRouter.post("/otp", async (req, res) => {
  const body = req.body;

  try {
    const check = await User.findOne({
      email: body.email,
    });

    if (!check) {
      return res.status(403).json({ msg: "enter correct email id" });
    }

    sendEmail({ email: body.email, OTP: body.OTP })
      .then((response) => {
        return res.send(check.email);
      })
      .catch((response) => {
        return res.send(response.msg);
      });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: "OTP not sent" });
  }
});

// for update password
userRouter.put("/update", async (req, res) => {
  const body = req.body;

  const salt = await bcrypt.genSalt(6);
  const securePass = await bcrypt.hash(body.password, salt);

  const check = await User.findOne({
    email: body.email,
  });
  const passcmpr = await bcrypt.compare(body.password, check.password);
  if (passcmpr) {
    return res.status(403).json({ msg: "same password again" });
  }

  try {
    const response = await User.updateOne(
      { email: body.email },
      { password: securePass }
    );
    return res.json({ msg: "password changed" });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: "password not changed" });
  }
});

// for add to cart
userRouter.post("/addtocart", Auth, async (req, res) => {
  const { productName, description, price, category, picture, quantity } =
    req.body;
  const userId = req.userId;

  try {
    // Check if the product is already in the cart for the user
    const check = await Cart.findOne({ productName, userId });

    if (check) {
      return res.status(403).json({
        msg: "Already added to cart",
      });
    }

    // If not in cart, create a new cart item
    const item = await Cart.create({
      productName,
      description,
      price,
      category,
      picture,
      quantity: quantity || 1,
      userId,
    });

    return res.json("Item added to cart");
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return res.status(500).json({ msg: "Error while adding to cart" });
  }
});

// api for show items in cart
userRouter.get("/showcart", Auth, async (req, res) => {
  const userId = req.userId;

  try {
    const items = await Cart.find({ userId: userId });
    res.json({ items });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: "error while getting items in cart" });
  }
});

// api for delete items in cart
userRouter.delete('/deletecart', Auth, async (req, res) => {
  try {
      const userId = req.userId; // Assuming Auth middleware sets req.userId
      const { itemId } = req.body; // Item ID to delete from cart

      // Find the user by ID
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Remove the item from the cart
      user.cart = user.cart.filter(item => item._id.toString() !== itemId);

      // Save the updated user document
      await user.save();

      res.status(200).json({ message: 'Item removed from cart', cart: user.cart });
  } catch (error) {
      console.error('Error removing item from cart:', error);
      res.status(500).json({ error: 'Server error' });
  }
});


// api for placedorder
userRouter.post("/placeorder", Auth, async (req, res) => {
  try {
    const userId = req.userId;
    const cartItems = await Cart.find({ userId: userId });

    if (!cartItems.length) {
      return res.status(400).send("No items in cart");
    }

    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const order = new Order({
      userId: userId,
      items: cartItems.map(item => ({
        productName: item.productName,
        price: item.price,
        quantity: item.quantity,
        picture: item.picture
      })),
      total: totalAmount,
    });

    await order.save();

    // Clear the cart after placing the order
    await Cart.deleteMany({ userId: userId });

    res.status(200).send("Order placed successfully");
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = userRouter;
