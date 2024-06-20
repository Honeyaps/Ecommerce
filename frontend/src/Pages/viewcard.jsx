import { useLocation } from "react-router-dom";
import { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./page.css";
import Navbar from "../Components/nav";
import Footer from "./footer";

axios.defaults.baseURL = "http://localhost:4900/";

export default function Viewcard() {
    const location = useLocation();
    const product = location.state?.product;
    const [addToCartLoading, setAddToCartLoading] = useState(false);
    const [addToCartError, setAddToCartError] = useState("");

    const addToCart = async () => {
        if (!product) return;

        const token = localStorage.getItem("token");

        try {
            setAddToCartLoading(true);
            const response = await axios.post("user/addtocart", {
                productName: product.productName,
                description: product.description,
                price: product.price,
                category: product.category,
                picture: product.picture,
                quantity: 1
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Item added to cart:", response.data);
        } catch (error) {
            console.error("Error adding item to cart:", error);
            if (error.response && error.response.status === 401) {
                setAddToCartError("Please login to add items to cart.");
            } else if (error.response && error.response.status === 403) {
                setAddToCartError("Item already in cart.");
            } else {
                setAddToCartError("Failed to add item to cart. Please try again.");
            }
        } finally {
            setAddToCartLoading(false);
        }
    };

    // Calculate the offer date
    const currentDate = new Date();
    const offerDate = new Date(currentDate);
    offerDate.setDate(currentDate.getDate() + 5);
    const formattedOfferDate = offerDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <>
            <Navbar />
            <div className="viwcard_contr">
                {product && (
                    <>
                        <div>
                            <Carousel data-bs-theme="dark" className="inner_crousel">
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={product.picture}
                                        alt="First slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={product.picture}
                                        alt="Second slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={product.picture}
                                        alt="Third slide"
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </div>
                        <div className="detail_sec">
                            <h1>{product.productName}</h1>
                            <p className="description_sec_inner">{product.description}</p>
                            <h2>Rs. {product.price}</h2>
                            <h5 className="previous_price">Rs. 10000</h5>
                            <span className="offer">55% off</span>
                            <br />
                            <p className="delvry_code">Delivering to : 122008</p>
                            <hr />
                            <span className="free_dlvry">Free Delivery</span> | By , {formattedOfferDate}<br />
                            If you Order within 6 hrs 8 mins
                            <br /> <br />
                            <div className="amzn_div">
                                <img src="amazon.webp" className="amazon_pic" alt="Amazon Logo" />
                                <p>20 Lacs+ units sold on Amazon<br />
                                    4 lacs+ 5 ⭐ Reviews</p>
                            </div>
                            <br />
                            <div className="amzn_next_div">
                                <h4>Make Your clothes personal</h4>
                                <p>Get A Customized Engraving And Make it Unmistakely Yours.</p>
                            </div>
                            <br/>
                            <button className="atc" onClick={addToCart} disabled={addToCartLoading}>
                                {addToCartLoading ? <span>Adding to Cart...</span> : <span>Add to Cart</span>}
                            </button>
                            {addToCartError && <p className="error_message">{addToCartError}</p>}
                        </div>
                    </>
                )}
            </div>
            <Footer/>
        </>
    );
}
