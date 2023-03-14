import { ArrowRight, Dashboard } from "@mui/icons-material";
import { Button, Drawer, IconButton, List, ListItem, ListItemText, Menu, MenuItem, Tooltip } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import siteLogo from "../assets/sideLogo.png"
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import DashboardCustomizeTwoToneIcon from '@mui/icons-material/DashboardCustomizeTwoTone';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import ApartmentTwoToneIcon from '@mui/icons-material/ApartmentTwoTone';
import ExitToAppSharpIcon from '@mui/icons-material/ExitToAppSharp';
import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import { color } from "@mui/system";
class Layout2 extends React.Component {
    constructor() {
        super();
        this.state = {
            menu: false,
            user: window.localStorage.getItem("user"),
            anchorEl: null,
            currentUserDetails: [],
            currentNgoDetails: [],
            volProjects: [],
            ngoProjects: [],
            color: "white",
        }
    }
    componentDidMount() {
        this.fetchData();

    }
    fetchData = async () => {
        try {
            const volunteersRes = await fetch("/getVolunteers", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (!volunteersRes.ok) {
                throw new Error(volunteersRes.statusText);
            }
            const volunteerData = await volunteersRes.json();
            if (volunteerData) {
                let currentuser = window.localStorage.getItem("email")
                currentuser = volunteerData.filter((vol) => vol.email === currentuser);
                if (currentuser) {
                    const activeVols = volunteerData.filter((vol) => vol.activeStatus === "true");
                    this.setState({ currentUserDetails: currentuser });
                }
            }

            const ngoRes = await fetch("/getNGO", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (!ngoRes.ok) {
                throw new Error(ngoRes.statusText);
            }
            const ngoData = await ngoRes.json();
            if (ngoData) {
                const activeNgo = ngoData.filter((ngo) => ngo.activeStatus === "true");
                let currentNgo = window.localStorage.getItem("email")
                currentNgo = activeNgo.filter((ngo) => ngo.email === currentNgo);
                this.setState({ currentNgoDetails: currentNgo });
            }
            const projectsRes = await fetch('/getProjects', {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            if (!projectsRes.ok) {
                throw new Error(projectsRes.statusText);
            }
            const projectData = await projectsRes.json();
            if (projectData) {
                if (this.state.user === "Volunteer") {
                    console.log("All Projects", projectData)
                    const activeProjects = projectData.filter((project) => project.isActive == true && project.vol.includes(this.state.currentUserDetails[0].fullname));
                    const projectName = activeProjects.filter(pro => pro.isActive === true && pro.vol.includes(this.state.currentUserDetails[0].fullname));
                    if (projectName) {
                        this.setState({ volProjects: projectName,color: "red" });
                    }
                }
                if (this.state.user === "Ngo") {
                    const activeNgoProjects = projectData.filter((project) => project.isActive == true && project.ngo === this.state.currentNgoDetails[0].ngoName);
                    if (activeNgoProjects) {
                        this.setState({ ngoProjects: activeNgoProjects, color: "red" });
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
    handleMenuOpen = (event) => {
        this.setState({ anchorEl: event.currentTarget ,color:"white"});
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };
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
                    <div>
                        {this.state.user && this.state.user != "Admin" && (
                            <>
                                <IconButton onClick={this.handleMenuOpen}>
                                    <NotificationsNoneTwoToneIcon style={{ color: this.state.color }} />
                                </IconButton>
                                <Menu
                                    anchorEl={this.state.anchorEl}
                                    open={Boolean(this.state.anchorEl)}
                                    onClose={this.handleMenuClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'left',
                                        horizontal: 'center',
                                    }}
                                >
                                    <MenuItem>
                                        <List>
                                            {this.state.user && this.state.user === "Volunteer" ? (
                                                this.state.volProjects && this.state.volProjects.map((name) => (
                                                    <ListItemText key={name._id}>You are selected in the Project {name.projectName} </ListItemText>
                                                ))
                                            ) : (
                                                this.state.ngoProjects && this.state.ngoProjects.map((name) => (
                                                    <ListItemText key={name._id}>Your request for Project {name.projectName} is accepted </ListItemText>
                                                ))

                                            )}
                                        </List>
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </div>
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
                    <div className="txt text-white">{this.state.user}</div>
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
                <div style={{ height: "130vh", background: "linear-gradient(to bottom, #578697 10%, #fff 90%)", width: "300px", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                    <div className="sideBar flex flex-row  items-center h-[6rem] m-10">
                        <div>
                            <img src={siteLogo} className="image md:w-full" />
                        </div>
                        <div>
                            <h1 className="heading font-bold md:w-full">ALFOUZ</h1>
                        </div>
                    </div>
                    <List>
                        <ListItem>
                            <div className="text-black font-bold text-lg"><DashboardCustomizeTwoToneIcon /><Link to={"/Dashboard"}>&nbsp; Dashboard</Link></div>
                        </ListItem>
                        <ListItem >
                            <div className="text-black font-bold text-lg"><AccountTreeIcon /><Link to={"/Projects"}>&nbsp;Project</Link></div>
                        </ListItem>
                        <ListItem >
                            <div className="text-black font-bold text-lg"><AccountCircleTwoToneIcon /><Link to={"/Volunteers"}>&nbsp;Volunteers</Link></div>
                        </ListItem>
                        <ListItem>
                            <div className="text-black font-bold text-lg"><ApartmentTwoToneIcon /><Link to={"/Ngo"}>&nbsp;NGO's</Link></div>
                        </ListItem>
                        <ListItem>
                            <div className="text-black font-bold text-lg"><ExitToAppSharpIcon /><Link to={"/Logout"}>&nbsp;Log Out</Link></div>
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        )
    }
    render() {
        return (
            <div style={{ height: "180vh", background: "linear-gradient(to bottom, #1e2950 0%, #38848c 100%)" }}>
                <div style={{ width: "30%" }}>
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