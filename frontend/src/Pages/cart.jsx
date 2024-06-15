import React from "react";
import "../Components/nav.css";
import { MdClose } from "react-icons/md";

export default function CartModal({ show, onClose }) {
    return (
        <div className={`cart_modal ${show ? "show" : ""}`}>
            <div className="cart_header">
                <h2>Cart</h2>
                <button className="cart_close_btn" onClick={onClose}>
                    <MdClose />
                </button>
            </div>
            <div className="cart_body">
                <p>Your cart is empty.</p>
                {/* Add your cart items here */}
            </div>
        </div>
    );
}
