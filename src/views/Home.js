import React from "react";
import { Button } from "@mui/material";
import Image1 from "../assets/Flood.jpg"
import Image2 from "../assets/Flood2.jpg";
import Image3 from "../assets/FloodRelief.jpg";
import Image4 from "../assets/House.jpg";
import logo from "../assets/logo.png";
import disaster from "../assets/disaster.png";
import education from "../assets/education.png";
import community from "../assets/community.png";
import handcare from "../assets/handcare.png";
import health from "../assets/health.png";
import tree from "../assets/tree.png";
import alkhidmatLogo from "../assets/Alkhidmat.jpg";
import AkhuwatLogo from "../assets/Akhuwat.png";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default class Home extends React.Component {
    constructor(){
        super();
    }
    render() {
        return (
            <div className="container">
                <div className="image flex flex-col justify-center items-center w-[100%]">
                    <img className="image md:auto rounded-2xl w-[70%]" src={Image1} />
                    <div className="top-left md:absolute top-15 left-[12rem] md:basline">
                        <h1 className="text-2xl md:text-4xl md:items-left md:w-10 mx-2 text-white font-bold">Let's Rebuild Pakistan</h1>
                        <div className="button mx-[10px] my-5">
                            <Button
                                style={{ background: "#38848c", color: "white", fontWeight: "medium", borderRadius: "10" }}>
                                Donate Now
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="heading text-center my-10">
                    <h1>
                        <span className="partner font-bold text-[#3be7e7] text-2xl md:text-4xl">PARTNER</span>
                        <span className="font-medium text-white text-xl md:text-2xl">&nbsp; NGO's</span>
                    </h1>
                </div>
                <div className="cards mx-7">
                    <div class="w-full md:flex">
                        <div class="w-full md:w-1/2">
                            <div className="Image1 md:w-[3rem] items-center">
                                <img src={AkhuwatLogo} className="lg:h-12" />
                            </div>
                            <div className="para text-white m-2">
                                <p>
                                    <strong>Akhuwat</strong> is a non-for-Profit organization which was founded in 2001 on the Islamic principle of Mawakhat or solidarity.
                                    It was also works for the poor and needy people in Pakistan.
                                </p>
                            </div>
                        </div>
                        <div class="w-full md:w-1/2">
                            <div className="Image2 md:w-[3rem]  items-center">
                                <img src={logo} className="image lg:h-12" />
                            </div>
                            <div className="para text-white m-2">
                                <p>
                                    The  <strong>Edhi</strong> Foundation is a non-profit social welfare organization based in Pakistan. It was founded by Abdul Sattar Edhi in 1951, who served as the head of the organization until his death on 8 July 2016. Bilquis Edhi, a nurse by profession, used to oversee the maternity and adoption services of the foundation.
                                </p>
                            </div>
                        </div>
                        <div class="w-full md:w-1/2">
                            <div className="Image3">
                                <img src={alkhidmatLogo} className="image h-12" />
                            </div>
                            <div className="para text-white m-2">
                                <p>
                                    <strong>Alkhidmat </strong> is the biggest NGO working in Pakistan. From raising orphans to provide relief in any disaster to arranging affordable healthcare & clean water, Alkhidmat provides relief services in all scopes of life.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="heading text-center my-10">
                    <h1>
                        <span className="partner font-bold text-[#3be7e7] text-2xl md:text-4xl" id="service">SERVICES</span>
                    </h1>
                    <h3 className="h3 text-white">The Spirit of All Religion is to serve humanity</h3>
                </div>

                <div>
                    <div class="row w-full md:flex">
                            <div class="w-full md:w-1/2">
                                <div className="items flex flex-col justify-around items-center">
                                    <img src={disaster} className="disaster h-[50px]"/>
                                    <p>disaster</p>
                                </div>
                            </div>
                            <div class="w-full md:w-1/2">
                                <div className="items flex flex-col justify-around items-center">
                                    <img src={education} className="education h-12"/>
                                    <p>education</p>
                                </div>
                            </div>
                            <div class="w-full md:w-1/2">
                                <div className="items flex flex-col justify-around items-center">
                                    <img src={community} className="community h-12"/>
                                    <p>community</p>
                                </div>
                            </div>
                            <div class="w-full md:w-1/2">
                                <div className="items flex flex-col justify-around items-center">
                                    <img src={handcare} className="handcare h-12" />
                                    <p>handcare</p>
                                </div>
                            </div>
                            <div class="w-full md:w-1/2">
                                <div className="items flex flex-col justify-around items-center">
                                    <img src={health} className="img5 h-12"/>
                                    <p>health</p>
                                </div>
                            </div>
                            <div class="w-full md:w-1/2">
                                <div className="items flex flex-col justify-around items-center">
                                    <img src={tree} className="tree h-12" />
                                    <p>tree</p>
                                </div>
                            </div>
                        </div>
                </div>

                <div className="heading text-center my-10">
                    <h1>
                        <span className="partner font-bold text-[#3be7e7] text-2xl md:text-4xl">ACTIVE</span>
                        <span className="font-medium text-white text-xl md:text-2xl">&nbsp; PROJECTS</span>
                    </h1>
                </div>

                <div className="row w-full md:flex md:justify-around md:items-center">
                    <div class="w-full md:w-1/2"></div>
                    <div class="w-full md:w-1/2">
                        <Card sx={{ maxWidth: 345, background: "#306c74", borderRadius:"15px"}}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={Image2}
                                title="Flood Relief"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Flood RELIEF
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Loss of household incomes, assets, rising food prices, and disease outbreaks are impacting the most vulnerable groups. Women
                                    have suffered notable losses of their livelihoods, particularly those associated with agriculture and livestock.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button style={{ color: "white", background: "#6c9cb4", borderRadius: "20px" }} size="medium">Donate Now</Button>
                            </CardActions>
                        </Card>
                    </div>
                    <div class="w-full md:w-1/2"></div>
                    <div class="w-full md:w-1/2">
                        <Card sx={{ maxWidth: 345, background: "#306c74",borderRadius:"15px" }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={Image3}
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Flood RELIEF
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Loss of household incomes, assets, rising food prices, and disease outbreaks are impacting the most vulnerable groups. Women
                                    have suffered notable losses of their livelihoods, particularly those associated with agriculture and livestock.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button style={{ color: "white", background: "#6c9cb4", borderRadius: "20px" }} size="medium">Donate Now</Button>
                            </CardActions>
                        </Card>
                    </div>
                    <div class="w-full md:w-1/2"></div>
                </div>
            </div>
        )
    }
} 