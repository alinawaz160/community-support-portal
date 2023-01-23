import React from "react";
import { Card, CardContent } from "@mui/material";
import Image1 from "../assets/Flood.jpg"
import Image2 from "../assets/Flood2.jpg"
import Image3 from "../assets/House.jpg"

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <div className='slider flex flex-col-reverse md:flex-row'>
                    <div className="left"></div>
                    <div className="right">
                        <Image1/>
                    </div>
                </div>
            </div>
        )
    }
} 