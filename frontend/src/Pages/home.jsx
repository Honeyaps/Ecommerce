import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Navbar from "../Components/nav";
import "./page.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 500 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 500, min: 300 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const sliderImageUrl = [
  //First image url
  {
    url: "https://bluorng.com/cdn/shop/files/45rr3.jpg?v=1708941517&width=360",
  },
  {
    url: "https://bluorng.com/cdn/shop/files/DSC0960324.jpg?v=1708150749&width=360",
  },
  //Second image url
  {
    url: "https://bluorng.com/cdn/shop/files/DSC0576028.jpg?v=1708315985&width=360",
  },
  //Third image url
  {
    url: "https://bluorng.com/cdn/shop/files/ijnjn.jpg?v=1710771177&width=360",
  },

  //Fourth image url

  {
    url: "https://bluorng.com/cdn/shop/files/DSC0576025.jpg?v=1707823747&width=360",
  },
];
const Home = () => {
  return (
    <div>
      <div className="parent">
        <Carousel
          responsive={responsive}
          autoPlay={true}
          swipeable={true}
          draggable={true}
          showDots={false}
          infinite={true}
          partialVisible={false}
          dotListClass="custom-dot-list-style"
        >
          {sliderImageUrl.map((imageUrl, index) => {
            return (
              <div className="slider" key={index}>
                <img src={imageUrl.url} alt="Clothes" />
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};
export default Home;
