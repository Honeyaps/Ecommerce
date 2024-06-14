import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import "./form.css";

axios.defaults.baseURL = "http://localhost:4900/";

export default function Admin() {
  const [allProducts, setAllProducts] = useState([]);
  const [selected, setSelected] = useState("add");

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Tshirts");
  const [picture, setPicture] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("admintoken")) {
      setLogin(true);
    } else {
      navigate("/admin");
    }
  }, [navigate]);

  function logOut() {
    localStorage.removeItem("admintoken");
    setLogin(false);
    navigate("/adminlogin");
  }

  useEffect(() => {
    async function serverCall() {
      try {
        const response = await axios.get("product/showProduct", {
          headers: {
            Authorization: localStorage.getItem("admintoken"),
          },
        });
        setAllProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    serverCall();
  }, []);

  async function deleteProduct(id) {
    try {
      const response = await axios.delete("product/deleteProduct", {
        headers: {
          Authorization: localStorage.getItem("admintoken"),
        },
        data: {
          id: id
        }
      });

      // Update the state to remove the deleted product
      setAllProducts((prevProducts) => ({
        ...prevProducts,
        product: prevProducts.product.filter((item) => item._id !== id),
      }));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  const handleClick = (section) => {
    setSelected(section);
  };

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
    formData.append("filename", picture);
    formData.append("description", description);

    try {
      const token = localStorage.getItem("admintoken");
      if (!token) {
        setError("User is not authenticated");
        return;
      }

      const response = await axios.post("product/addProduct", formData, {
        headers: {
          Authorization: token,
        },
      });

      setSuccess("Product added successfully!");

      setProductName("");
      setPrice("");
      setCategory("Tshirts");
      setPicture(null);
      setDescription("");

      document.getElementById("file-input").value = "";

      // Refresh the product list after adding a new product
      const productsResponse = await axios.get("product/showProduct", {
        headers: {
          Authorization: localStorage.getItem("admintoken")
        }
      });
      setAllProducts(productsResponse.data);
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
          className={`add ${selected === "add" ? "selected" : ""}`}
          onClick={() => handleClick("add")}
        >
          ADD PRODUCT
        </h2>
        <h2
          className={`list ${selected === "list" ? "selected" : ""}`}
          onClick={() => handleClick("list")}
        >
          PRODUCT LIST
        </h2>
        {login && (
          <button className="logout_btn" onClick={logOut}>
            Logout
          </button>
        )}
      </div>
      <div className="container">
        {selected === "add" ? (
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
                    name="filename"
                    id="file-input"
                    onChange={handleFileChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows="4"
                  />
                </div>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <button type="submit" className="submit">
                  Add Product
                </button>
              </form>
            </div>
          </>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Sr.no</th>
                <th>Product</th>
                <th>Name</th>
                <th>Price</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {allProducts.product && allProducts.product.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}.</td>
                  <td>
                    <img
                      src={item.picture}
                      alt={`product-${index}`}
                      height={70}
                    />
                  </td>
                  <td>
                    <h4>{item.productName}</h4>
                  </td>
                  <td>
                    <h4>{item.price}</h4>
                  </td>
                  <td>
                    <button
                      className="dlt_btn"
                      onClick={() => deleteProduct(item._id)}
                    >
                      <RiDeleteBin6Line className="dlt" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
