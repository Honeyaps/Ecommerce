import axios from "axios"
import { useEffect, useState } from "react";
import "./page.css"
import { Link } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:4900/";

export default function Card(){
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function serverCall() {
          const response = await axios.get("product/showProduct");
          setProducts(response.data.product);
          // console.log(response.data.blog);
        }
        serverCall();
      }, []);

    return(
        <>
    <div className="card_cntnr">
    {products.map((item, index) => (
        <div className="card_div">
            <div key={index} className="pic-div">
                <img src={item.picture} alt="product_image" className="card_img"/>
            </div>
            <div>
                <p className="prod_name">{item.productName}</p>
                <p className="prod_price">RS. {item.price}</p>
            </div>
        </div>
        ))}
        </div>
        <br/>
       
        <br/>
        </>
    );
}