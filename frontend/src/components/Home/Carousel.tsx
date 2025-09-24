import { useEffect, useState } from "react";
import "./home.css";

const sliderImages = [
  "Men Butterfly And Floral Print Short Sleeve Button….jpeg",
  "Loose Men Letter Graphic Colorblock Shirt Without Tee.jpeg",
  "HUGO - Stylische und bequeme Sneakers für Männer….jpeg",
  "c1042244-9d66-45cb-a73e-ff7a98d9ca4d.jpeg",
];
const CarouselContainer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((c) => c + 1);
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex >= sliderImages.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, sliderImages.length]);

  return (
    <div className="carousel">
      <div className="slider" style={{ translate: `-${currentIndex}00% 0` }}>
        {sliderImages &&
          sliderImages.map((img, index) => (
            <div
              key={index}
              className={index == currentIndex ? "slide active" : "slide"}
            >
              <img src={`images/${img}`} alt="" />
            </div>
          ))}
      </div>
      <div className="radio_btns">
        {[...Array(sliderImages.length)].map((_, index) => (
          <button
            key={index}
            className={index == currentIndex ? "active" : ""}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CarouselContainer;
