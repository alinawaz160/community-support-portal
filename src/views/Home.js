import React from "react";
import { Button, Card, CardContent } from "@mui/material";
import Image1 from "../assets/Flood.jpg"
import Image2 from "../assets/Flood2.jpg"
import Image3 from "../assets/House.jpg"

export default class Home extends React.Component {
    render() {
        return (
            <div className="container">
                <div className='slider flex flex-col-reverse md:flex-row bg-none'>
                    <div className="left flex flex-col align-center items-center bg-black md:items-baseline py-8">
                        <h1 className="text-2xl md:text-4xl mx-5 text-white font-bold">Let's Rebuild Pakistan Now</h1>
                        <Button className="button px-4 py-2 my-6 md:items-left"
                            style={{ background: "#fff", color: "black" }}>
                            Donate
                        </Button>
                    </div>
                    <div className="right">
                        <img className="md:auto p-6 w-50% h-50rem" src={Image1} />
                    </div>
                </div>
            </div>
        )
    }
} 