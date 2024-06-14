const express = require("express");
const zod = require("zod");
const Auth = require("../Auth/middleware");
const multer = require("multer");
const {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const { storage, Addproduct } = require("../db");
require("dotenv").config();

const addProductRouter = express.Router();

const zodvalidation = zod.object({
  productName: zod.string(),
  description: zod.string(),
});

const upload = multer({ storage: multer.memoryStorage() });
const multiple = [Auth, upload.single("filename")];

// api for adding product
addProductRouter.post("/addProduct", multiple, async (req, res) => {
  const body = req.body;
  if (!req.file) {
    console.log("file not uploaded");
  }

  const success = zodvalidation.safeParse(body);
  if (!success) {
    return res.status(403).json({ msg: "invalid data" });
  }

  try {
    const dataTime = Date.now();
    const storageRef = ref(storage, `Bluorng/${req.file.originalname + " " + dataTime}`);
    const metadata = {
      contentType: req.file.mimetype
    };
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );
    const downloadURL = await getDownloadURL(snapshot.ref);

    const product = await Addproduct.create({
      productName: body.productName,
      description: body.description,
      price: body.price,
      category: body.category,
      picture: downloadURL,
    });

    return res.json({
        msg: "file uploaded",
        name: req.file.originalname,
        downloadURL: downloadURL,
        data: product._id.toHexString()
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ msg: "uploading error" });
  }
});

// api to show products as card
addProductRouter.get("/showProduct" , async(req,res) => {
    try{
        const response = await Addproduct.find({});
            return res.json({
                product: response
            })
    }
    catch(error){
        console.log(error)
        return res.status(403).json({msg: "error while showing products as card"})
    }
})

// api for deleting products
addProductRouter.delete("/deleteProduct", Auth, async (req, res) => {
  const { id } = req.body;

  try {
      const response = await Addproduct.deleteOne({ _id: id });
      res.json({ msg: "deleted successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Product not deleted" });
  }
});

module.exports = addProductRouter;
