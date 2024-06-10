import "./form.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:4900/";

export default function Admin() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Tshirts");
  const [picture, setPicture] = useState(null);
  const [description, setDescription] = useState(""); // New state variable
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selected, setSelected] = useState("add");

  const handleClick = (section) => {
    setSelected(section);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!productName) {
      setError("Product name is required");
      return;
    }
    if (!price || isNaN(price) || price <= 0) {
      setError("Price must be a valid number greater than 0");
      return;
    }
    if (!picture) {
      setError("Product picture is required");
      return;
    }
    if (!description) {
      setError("Product description is required");
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("picture", picture);
    formData.append("description", description); // Add description to form data

    try {
      // const response = await axios.post("/product/addProduct", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      setSuccess("Product added successfully!");
      
      setProductName("");
      setPrice("");
      setCategory("Tshirts");
      setPicture(null);
      setDescription(""); // Reset description
      navigate("/");
    } catch (err) {
      console.error("Error:", err);
      setError("Error adding product");
    }
  };

  const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
  };

  return (
    <>
      <div className="admin_navbar">
        <h2
          className={`add ${selected === 'add' ? 'selected' : ''}`}
          onClick={() => handleClick('add')}
        >
          ADD PRODUCT
        </h2>
        <h2
          className={`list ${selected === 'list' ? 'selected' : ''}`}
          onClick={() => handleClick('list')}
        >
          PRODUCT LIST
        </h2>
      </div>
      <div className="container">
        {selected === 'add' ? (
          <>
            <h1>Add Product</h1>
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="Tshirts">Tshirts</option>
                    <option value="Hoodies">Hoodies</option>
                    <option value="Jeans">Jeans</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Product Picture</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label> {/* New description field */}
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows="4"
                  />
                </div>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <button type="submit" className="submit">Add Product</button>
              </form>
            </div>
          </>
        ) : (
          <h1>Hello</h1>
        )}
      </div>
    </>
  );
}
