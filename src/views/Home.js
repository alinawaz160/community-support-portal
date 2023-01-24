import React from "react";
import { Button, Card, CardContent } from "@mui/material";
import Image1 from "../assets/Flood.jpg"
import Image2 from "../assets/Flood2.jpg"
import Image3 from "../assets/House.jpg"

export default class Home extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="image flex flex-col justify-center items-center w-[100%]">
                    <img className="image md:auto rounded-2xl w-[70%]" src={Image1} />
                    <div className="top-left md:absolute top-15 left-[12rem] md:basline">
                        <h1 className="text-2xl md:text-4xl md:items-left md:w-10 mx-2 text-white font-bold">Let's Rebuild Pakistan</h1>
                        <div className="button mx-[10px] my-5">
                            <Button
                                style={{ background: "#38848c", color: "white" ,fontWeight:"medium"}}>
                                Donate Now
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="row my-20">
                    <div className="col-xl-12 col-sm-12 col-md-12">
                        <div className="project-heading text-center">
                            <h2>Partner NGO's</h2>
                        </div>
                        <div className="row my-20">
                            <div className="col-xl-3 col-md-2 col-sm-12"></div>
                            <div className="col-xl-6 col-md-8 col-sm-12">
                                <div>
                                    <div className="row" style={{marginTop: "40px"}}>
                                        <div className="col-xl-3 col-md-3 col-sm-6">
                                            <a href="careersCategory/techCareer">
                                                <div className="position-filter">
                                                    <h3 style={{marginBottom: "0px",fontFamily: "Gilmer, sans-serif",fontSize: "14px",fontWeight: "400",textAlign: "center"}}>
                                                        Tech</h3>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="col-xl-3 col-md-3 col-sm-6">
                                            <a href="careersCategory/operationsCareer">
                                                <div className="position-filter">
                                                    <h3 style={{marginBottom: "0px",fontFamily: "Gilmer, sans-serif",fontSize: "14px",fontWeight: "400",textAlign: "center"}}>
                                                        Operations</h3>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="col-xl-3 col-md-3 col-sm-6">
                                            <a href="careersCategory/administrationCareer">
                                                <div className="position-filter">
                                                    <h3 style={{marginBottom: "0px",fontFamily: "Gilmer, sans-serif",fontSize: "14px",fontWeight: "400",textAlign: "center"}}>
                                                        Administration</h3>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="col-xl-3 col-md-3 col-sm-6">
                                            <a href="careersCategory/managementCareer">
                                                <div className="position-filter">
                                                    <h3 style={{marginBottom: "0px",fontFamily: "Gilmer, sans-serif",fontSize: "14px",fontWeight: "400",textAlign: "center"}}>
                                                        Management</h3>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 