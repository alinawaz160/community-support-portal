import React from "react";
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Button } from "@mui/material";
import { Map } from "@mui/icons-material";
import TheContent from "./TheContent";
import { ToastContainer } from "react-toastify";

class Layout extends React.Component {
    constructor(props) {
        super();
        this.state = {
            menuOpen: false
        }
    }
    sidebar = () => {
        return (
            <Drawer
                open={this.state.menuOpen}
                onClose={() => { this.setState({ menuOpen: false }) }}
            >
                <div style={{ width: "200px" }}>
                    <ListItem button>
                        <ListItemText primary={"This is a Home"} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary={"Account"} />
                    </ListItem>
                </div>
            </Drawer>
        )
    }
    header = () => {
        return (
            <div className="navbar flex  justify-between items-center p-4">
                <div className="flex justify-center items-center">
                    <Button onClick={() => { this.setState({ menuOpen: true }) }}>
                        <div className="humburger inline-block p-4 cursor-pointer md:hidden">
                            <div className="line h-1 w-6 my-1 bg-white"></div>
                            <div className="line h-1 w-6 my-1 bg-white"></div>
                            <div className="line h-1 w-6 my-1 bg-white"></div>
                        </div>
                    </Button>
                    <div className="name text-white font-bold  text-lg md:text-4xl">
                        ALFOUZ
                    </div>
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div className="joinNow text-white hidden md:block"><a>Join Now</a></div>
                <div className="services text-white hidden md:block"><a>Services</a></div>
                <div className="signIn text-white hidden md:block"><a>Sign In</a></div>
                <div className="aboutUS text-white hidden md:block"><a>About Us</a></div>
                <div className="donate">
                    <Button className="button text-black"
                        style={{ background: "#6494a0", color: "black" }}>
                        Donate
                    </Button>
                </div>
            </div>
        )
    }
    footer = () => {
        return (
            <div>
                <Toolbar style={{ position: 'relative', backgroundColor: "#grey", color: "white" }}
                >
                    <div className="cards mx-7">
                        <div class="w-full md:flex">
                            <div class="w-full md:w-1/2">
                                <div className="Image1 items-center">
                                    <h1 className="heading font-bold">AL-FOUZ</h1>
                                </div>
                                <div className="para text-white m-2">
                                    <p>
                                        Alfouz explains about a concept of developing a nonprofit website for NGOs/charity organizations. It will bring together these
                                        organizations and volunteers for effective community service.                                </p>
                                </div>
                            </div>
                            <div class="w-full md:w-1/2">
                                <div className="Image2 md:w-[3rem]  items-center">
                                    <h1 className="heading font-bold">Pages</h1>
                                </div>
                                <div className="para text-white m-2">
                                    <ul>
                                        <li>Join Us</li>
                                        <li>Services</li>
                                        <li>About Us</li>
                                        <li>Sign in</li>
                                        <li>Donate</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="w-full md:w-1/2">
                                <div className="Image3">
                                    <h1 className="heading font-bold">Services</h1>
                                </div>
                                <div className="para text-white m-2">
                                    <ul>
                                        <li>Disaster Management</li>
                                        <li>Services</li>
                                        <li>Free Education</li>
                                        <li>Sign in</li>
                                        <li>Community Services</li>
                                        <li>Tree Plantation   </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="w-full md:w-1/2">
                                <div className="Image3">
                                    <h1 className="heading font-bold">Map</h1>
                                </div>
                                <div className="para">
                                    <Map
                                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"
                                        loadingElement={<div style={{ height: `100%` }} />}
                                        containerElement={<div style={{ height: `400px` }} />}
                                        mapElement={<div style={{ height: `100%` }} />}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </Toolbar>

            </div>
        )
    }
    render() {
        return (
            <div style={{ background: "linear-gradient(to bottom, #1e2950 10%, #38848c 90%)" }}>
                <div style={{ width: "30%" }}>
                    {this.sidebar()}
                </div>
                    {this.header()}
                <div>
                    {this.props.children}
                </div>
                    {this.footer()}
                </div>
        )
    }
}
export default Layout;