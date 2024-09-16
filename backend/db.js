const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://honeyaps12345:L2oux0cQoRO8yBaN@cluster0.pc9z2.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0").then(() => {
  console.log("mongoose connected");
});

// for firebase img db
const firebaseConfig = {
  apiKey: "AIzaSyBvqUo7auStgl4KT54M22QMdOQeoCmgycA",
  authDomain: "bluorng.firebaseapp.com",
  projectId: "bluorng",
  storageBucket: "bluorng.appspot.com",
  messagingSenderId: "552070246369",
  appId: "1:552070246369:web:9fb8d8ba5b4cb38ea7eca0",
  measurementId: "G-8VK2CWPS2M"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// schema for user signup
const userschema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("user", userschema);

// schema for admin signin
const adminschema = new mongoose.Schema({
  email: String,
  password: String,
});

const Adminlogin = mongoose.model("adminlogin", adminschema);

// schema for adding new product by admin
const productschema = new mongoose.Schema({
  productName: String,
  description: String,
  price: Number,
  category: String,
  picture: String,
});

const Addproduct = mongoose.model("addproduct", productschema);

// schema for ADD TO CART
const atcschema = new mongoose.Schema({
  productName: String,
  description: String,
  price: Number,
  category: String,
  picture: String,
  quantity: Number,
  userId: String
});

const Cart = mongoose.model("cart", atcschema);

// schema for Placed order
const OrderSchema = new mongoose.Schema({
  userId: String,
  items: [{
      productName: String,
      price: Number,
      quantity: Number,
      picture: String
  }],
  total: Number,
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", OrderSchema);


module.exports = { User, Adminlogin, Addproduct, storage, Cart ,Order};
