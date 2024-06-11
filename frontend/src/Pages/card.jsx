export default function Card(){
    return(
        <div className="card_div">
            <div className="pic-div">
                <img src="demo_card_pic.webp" alt="product_image" />
            </div>
            <div>
                <h4>product name</h4>
                <p>Price</p>
            </div>
        </div>
    );
}