import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Banner() {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img src="/s1.jpg" loading="lazy" alt="slider1" />
        </div>
        <div>
          <img src="/s2.jpg" loading="lazy" alt="slider1" />
        </div>
        <div>
          <img src="/s4.jpg" loading="lazy" alt="slider1" />
        </div>
        <div>
          <img src="s5.jpeg" loading="lazy" alt="slider1" />
        </div>
        <div>
          <img
            src="https://links.papareact.com/gi1"
            loading="lazy"
            alt="slider1"
          />
        </div>
        <div>
          <img
            src="https://links.papareact.com/6ff"
            loading="lazy"
            alt="slider1"
          />
        </div>
        <div>
          <img
            src="https://links.papareact.com/7ma"
            loading="lazy"
            alt="slider1"
          />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
