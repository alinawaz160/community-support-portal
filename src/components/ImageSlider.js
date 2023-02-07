import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Image1 from "../assets/Flood.jpg";
import Image2 from "../assets/Flood2.jpg";
import Image3 from "../assets/House.jpg"

const ImageSlider = () => {
    const images = [Image1, Image2, Image3];
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImage((currentImage + 1) % images.length);
        }, 3000);
        return () => clearInterval(intervalId);
    }, [currentImage, images.length]);

    return (
        <div className="image flex flex-col justify-center items-center w-100">
            <img className="image md:auto rounded-2xl w-[50%]" src={images[currentImage]} />
            <div className="top-left md:absolute top-[15rem] left-[20rem] md:baseline lg:baseline">
                <h1 className="text-2xl md:text-4xl md:items-left md:w-10 mx-2 text-white font-bold">Let's Rebuild Pakistan</h1>
                <div className="button mx-2 my-2">
                    <Button
                        style={{ background: "#38848c", color: "white", fontWeight: "medium", borderRadius: "10" }}>
                        Donate Now
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;

