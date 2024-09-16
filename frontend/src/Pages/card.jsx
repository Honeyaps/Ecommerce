import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./page.css";
import axiosInstance from "../Registration/axiosConfig";

export default function Card() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function serverCall() {
      try {
        const response = await axiosInstance.get("product/showProduct");
        setProducts(response.data.product);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    serverCall();
  }, []);

  const handleClick = (product) => {
    navigate("/viewcard", {
      state: { product },
    });
  };

  const filterProductsByCategory = (category) => {
    return products.filter((product) => product.category === category);
  };

  const tshirts = filterProductsByCategory("Tshirts");
  const jeans = filterProductsByCategory("Jeans");
  const hoodies = filterProductsByCategory("Hoodies");

  return (
    <>
      <div className="section">
        <h1>T-SHIRTS</h1>
        <div className="card_cntnr">
          {tshirts.map((item, index) => (
            <div key={index} className="card_div" onClick={() => handleClick(item)}>
              <div className="pic-div">
                <img src={item.picture} alt="product_image" className="card_img" />
              </div>
              <div>
                <p className="prod_name">{item.productName}</p>
                <p className="prod_price">RS. {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
<div className="img_section">
  <img src="bluorng_desktop_12.webp" alt="main_img" className="main_img"/>
</div>
<br/>
      <div className="section">
        <h1>JEANS</h1>
        <div className="card_cntnr">
          {jeans.map((item, index) => (
            <div key={index} className="card_div" onClick={() => handleClick(item)}>
              <div className="pic-div">
                <img src={item.picture} alt="product_image" className="card_img" />
              </div>
              <div>
                <p className="prod_name">{item.productName}</p>
                <p className="prod_price">RS. {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h1>HOODIES</h1>
        <div className="card_cntnr">
          {hoodies.map((item, index) => (
            <div key={index} className="card_div" onClick={() => handleClick(item)}>
              <div className="pic-div">
                <img src={item.picture} alt="product_image" className="card_img" />
              </div>
              <div>
                <p className="prod_name">{item.productName}</p>
                <p className="prod_price">RS. {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
