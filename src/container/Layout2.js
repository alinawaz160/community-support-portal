import { Dashboard } from "@mui/icons-material";
import { Button, Drawer, ListItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import siteLogo from "../assets/siteLogo.png"
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
                <div className="user">
                    <AccountCircleRoundedIcon />
                    <div>Admin</div>
                </div>
            </div>
        )
    }
    sidebar = () => {
        return (
            <Drawer
                open={this.state.menu}
                onAbort={()=>this.setState({menu:false})}
            >
                <div style={{ width: "200px" }}>
                    <div>
                        <div>
                            <img src={siteLogo} />
                        </div>
                        <div>
                            <h2>ALFOUZ</h2>
                        </div>
                    </div>
                    <ListItem button>
                        <div><Link to={"/Dashboard"}>Dashboard</Link></div>
                    </ListItem>
                    <ListItem >
                        <div><Link to={"/Projects"}>Project</Link></div>
                    </ListItem>
                    <ListItem >
                        <div><Link to={"/Projects"}>Volunteers</Link></div>
                    </ListItem>
                    <ListItem>
                        <div><Link to={"/Projects"}>NGO's</Link></div>
                    </ListItem>
                </div>
            </Drawer>
        )
    }
    render() {
        return (
            <div style={{ background: "linear-gradient(to bottom, #1e2950 10%, #fff 90%)" }}>
                <div style={{ width: "30%" }}>
                    {this.sidebar()}
                </div>
                {this.header()}
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default Layout2;