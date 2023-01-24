import React from "react";
import { Link } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme } from "@mui/material/styles";
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Button } from "@mui/material";
import { Box } from "@mui/system";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

class Container extends React.Component {
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
            // <div>
            //     <AppBar position="static" color="transparent" style={{ boxShadow: "none" }}>
            //         <Toolbar>
            //             <IconButton
            //                 onClick={() => { this.setState({ menuOpen: true }) }}
            //                 size="large"
            //                 edge="start"
            //                 aria-label="open drawer"
            //                 sx={{ mr: 2 }}
            //                 style={{color:"white"}}
            //             >
            //                 <MenuIcon />
            //             </IconButton>
            //             <Typography
            //                 variant="h6"
            //                 noWrap
            //                 component="div"
            //                 sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            //                 style={{ color: "white",fontFamily:"sans-serif",fontWeight:"bold" }}
            //             >
            //                 ALFOUZ
            //             </Typography>
            //             <Box sx={{ display: { xs: 'none', sm: 'block',width:"80%" } }}>
            //             <nav style={{display:"flex",justifyContent:"space-around"}}>
            //                 <Button style={{color:"white"}}>
            //                     Join US
            //                 </Button>
            //                 <Button style={{color:"white"}}>
            //                     Services
            //                 </Button>
            //                 <Button style={{color:"white"}}>
            //                     Sign In
            //                 </Button>
            //                 <Button style={{color:"white"}}>
            //                     About Us
            //                 </Button>
            //                 <Button style={{borderRadius:"5",background:"#6494a0",color:"black",fontWeight:"bolder"}}>
            //                     Donate
            //                 </Button>
            //             </nav>
            //             </Box>

            //             {/* <Search>
            //                 <SearchIconWrapper>
            //                     <SearchIcon />
            //                 </SearchIconWrapper>
            //                 <StyledInputBase
            //                     placeholder="Search…"
            //                     inputProps={{ 'aria-label': 'search' }}
            //                 />
            //             </Search> */}
            //         </Toolbar>
            //     </AppBar>
            // </div>
            <div className="navbar flex  justify-between items-center p-4">
                <div className="flex justify-center items-center">
                    <Button onClick={()=>{ this.setState({menuOpen:true})}}>
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
                            style={{background:"#6494a0",color:"black"}}>
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
                    <h1>Footer</h1>
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
export default Container;