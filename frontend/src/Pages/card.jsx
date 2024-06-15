import axios from "axios";
import { useEffect, useState } from "react";
import "./page.css";

axios.defaults.baseURL = "http://localhost:4900/";

export default function Card() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function serverCall() {
      const response = await axios.get("product/showProduct");
      setProducts(response.data.product);
    }
    serverCall();
  }, []);


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
            <div key={index} className="card_div">
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
      <br/><br/>
      <div className="img_section">
          <img src="bluorng_desktop_12.webp" className="main_img" alt="Main Image"/>
      </div>
<br/><br/>
      <div className="section">
        <h1>JEANS</h1>
        <div className="card_cntnr">
          {jeans.map((item, index) => (
            <div key={index} className="card_div">
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
<br/><br/>
      <div className="section">
        <h1>HOODIES</h1>
        <div className="card_cntnr">
          {hoodies.map((item, index) => (
            <div key={index} className="card_div">
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
