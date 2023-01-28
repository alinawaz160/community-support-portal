import { ArrowRight, Dashboard } from "@mui/icons-material";
import { Button, Drawer, IconButton, ListItem, Tooltip } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import siteLogo from "../assets/sideLogo.png"
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

class Layout2 extends React.Component {
    constructor() {
        super();
        this.state = {
            menu: false
        }
    }
    header = () => {
        return (
            <div className="navbar flex  justify-between items-center p-4">
                <div className="flex justify-center items-center">
                    <Button onClick={() => { this.setState({ menu: true }) }}>
                        <div className="humburger inline-block p-4 cursor-pointer ">
                            <div className="line h-1 w-6 my-1 bg-white"></div>
                            <div className="line h-1 w-6 my-1 bg-white"></div>
                            <div className="line h-1 w-6 my-1 bg-white"></div>
                        </div>
                    </Button>
                    <div className="name text-white font-bold  text-lg md:text-4xl">
                        MENU
                    </div>
                </div>
                <div className="user flex flex-row justify-center items-center">
                    <Tooltip title="User">
                        <IconButton
                            size="large"
                            sx={{
                                '& svg': {
                                    color: 'rgba(255,255,255,0.8)',
                                    transition: '0.2s',
                                    transform: 'translateX(0) rotate(0)',
                                },
                                '&:hover, &:focus': {
                                    bgcolor: 'unset',
                                    '& svg:first-of-type': {
                                        transform: 'translateX(-4px) rotate(-20deg)',
                                    },
                                    '& svg:last-of-type': {
                                        right: 0,
                                        opacity: 1,
                                    },
                                },
                                '&:after': {
                                    content: '""',
                                    position: 'absolute',
                                    height: '80%',
                                    display: 'block',
                                    left: 0,
                                    width: '1px',
                                    bgcolor: 'divider',
                                },
                            }}
                        >
                            <AccountCircleRoundedIcon />
                            <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
                        </IconButton>
                    </Tooltip>
                    <div className="txt text-white">Admin</div>
                </div>
            </div>
        )
    }
    sidebar = () => {
        return (
            <Drawer
                open={this.state.menu}
                onClose={() => { this.setState({ menu: false }) }}
            >
                <div style={{ background: "linear-gradient(to bottom, #1e2950 10%, #fff 90%)",width: "300px", display: "flex", flexDirection: "column", justifyContent: "space-between", textAlign: "center" }}>
                    <div className="sideBar flex flex-row  items-center h-[6rem] m-10">
                        <div>
                            <img src={siteLogo} className="image md:w-full" />
                        </div>
                        <div>
                            <h1 className="heading font-bold md:w-full">ALFOUZ</h1>
                        </div>
                    </div>
                    <ListItem>
                        <div><Link to={"/Dashboard"}>Dashboard</Link></div>
                    </ListItem>
                    <ListItem >
                        <div><Link to={"/Projects"}>Project</Link></div>
                    </ListItem>
                    <ListItem >
                        <div><Link to={"/Volunteers"}>Volunteers</Link></div>
                    </ListItem>
                    <ListItem>
                        <div><Link to={"/Ngo"}>NGO's</Link></div>
                    </ListItem>
                    <ListItem>
                    <div><Link to={"/"}>Log Out</Link></div>
                </ListItem>
                </div>
            </Drawer>
        )
    }
    render() {
        return (
            <div style={{height:"100vh", background: "linear-gradient(to bottom, #1e2950 0%, #38848c 100%)" }}>
                <div style={{ width: "30%"}}>
                    {this.sidebar()}
                </div>
                {this.header()}
                <div>
                    {this.props.children}
                </div>
                <div>
                    {this.fo}
                </div>
            </div>
        );
    }
}
export default Layout2;