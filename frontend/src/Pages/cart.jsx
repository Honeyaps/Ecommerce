import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdClose } from "react-icons/md";
import "../Components/nav.css";
import { RiDeleteBin6Line } from "react-icons/ri";

axios.defaults.baseURL = "http://localhost:4900/";

export default function CartModal({ show, onClose, onCartUpdate }) {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [total, setTotal] = useState(0);
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        const fetchCartItems = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Please login to view your cart.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get("user/showcart", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCartItems(response.data.items);
                calculateTotal(response.data.items);
                onCartUpdate(response.data.items.length); // Notify the Navbar component
            } catch (error) {
                console.error("Error fetching cart items:", error);
                setError("Failed to fetch cart items. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        if (show) {
            fetchCartItems();
        }
    }, [show]);

    const calculateTotal = (items) => {
        const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(totalAmount);
    };

    const handleQuantityChange = (itemId, delta) => {
        const updatedItems = cartItems.map((item) =>
            item._id === itemId ? { ...item, quantity: item.quantity + delta } : item
        ).filter(item => item.quantity > 0);

        setCartItems(updatedItems);
        calculateTotal(updatedItems);
        onCartUpdate(updatedItems.length); // Notify the Navbar component
    };

    const handleRemoveItem = async (itemId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete("user/deletecart", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: { itemId }
            });

            const updatedItems = cartItems.filter((item) => item._id !== itemId);
            setCartItems(updatedItems);
            calculateTotal(updatedItems);
            onCartUpdate(updatedItems.length); // Notify the Navbar component
        } catch (error) {
            console.error("Error removing item from cart:", error);
            setError("Failed to remove item. Please try again.");
        }
    };

    const handlePlaceOrder = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post("user/placeorder", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCartItems([]);
            setTotal(0);
            onCartUpdate(0); // Notify the Navbar component
            setOrderSuccess(true);
            setTimeout(() => setOrderSuccess(false), 2000);
        } catch (error) {
            console.error("Error placing order:", error);
            setError("Failed to place order. Please try again.");
        }
    };

    return (
        <>
            <div className={`cart_modal ${show ? "show" : ""}`}>
                <div className="cart_header">
                    <h2>Cart</h2>
                    <button className="cart_close_btn" onClick={onClose}>
                        <MdClose />
                    </button>
                </div>
                <div className="cart_body">
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div className="error_message">{error}</div>
                    ) : cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <>
                            <ul className="cart_list">
                                {cartItems.map((item) => (
                                    <li key={item._id} className="cart_item">
                                        <img src={item.picture} alt={item.productName} className="cart_item_image" />
                                        <div className="cart_item_details">
                                            <h6>{item.productName}</h6>
                                            <p>Rs. {item.price}</p>
                                            <div className="quantity_controls">
                                                <button onClick={() => handleQuantityChange(item._id, -1)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => handleQuantityChange(item._id, 1)}>+</button>
                                           
                                            <button className="remove_item_btn" onClick={() => handleRemoveItem(item._id)}><RiDeleteBin6Line /></button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
                <div className="cart_total">
                    <h3>Total: Rs. {total}</h3>
                    <button className="place_order_btn" onClick={handlePlaceOrder}>Place Order</button>
                </div>
            </div>
            {orderSuccess && (
                <div className="order_success_modal">
                    <div className="order_success_content">
                        <h2>Order placed successfully!</h2>
                    </div>
                </div>
            )}
        </>
    );
}
