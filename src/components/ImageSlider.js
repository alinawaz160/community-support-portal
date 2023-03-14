import { Button, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import Image1 from "../assets/Flood.jpg";
import Image2 from "../assets/Flood2.jpg";
import Image3 from "../assets/House.jpg";
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';

function ImageSlider() {
    const images = [Image1, Image2, Image3]; 
  const [currentImage, setCurrentImage] = useState(0);

  const handleArrowClick = (direction) => {
    if (direction === "left") {
      setCurrentImage((currentImage - 1 + images.length) % images.length);
    } else if (direction === "right") {
      setCurrentImage((currentImage + 1) % images.length);
    }
  };

  return (
    <div className="image relative flex flex-col justify-end items-start w-100">
      <img className="image md:auto rounded-2xl w-[100%]" src={images[currentImage]} />
      <div className="bottom-left md:absolute bottom-0 left-0 md:baseline lg:baseline">
        <h1 className="text-2xl md:text-4xl md:items-left md:w-10  text-white font-bold">Let's Rebuild Pakistan</h1>
        <div className="button mx-2 my-2">
          <Button
            style={{ background: "#38848c", color: "white", fontWeight: "medium", borderRadius: "10" }}
            onClick={() => handleArrowClick("right")}
          >
            Donate Now
          </Button>
        </div>
      </div>
      <div className="arrow absolute top-1/2 right-0 transform -translate-y-1/2">
        <IconButton onClick={() => handleArrowClick("right")} size="large">
            <ArrowForwardTwoToneIcon style={{color:"white"}}/>
        </IconButton>
      </div>
    </div>
  );
}


export default ImageSlider;

