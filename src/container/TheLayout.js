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
            <div>
                <AppBar position="static" color="transparent" style={{ boxShadow: "none" }}>
                    <Toolbar>
                        <IconButton
                            onClick={() => { this.setState({ menuOpen: true }) }}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            style={{ color: "black" }}
                        >
                            AL FOUZ
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Toolbar>
                </AppBar>
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
            <div style={{backgroundColor:"linear-gradient(#1e2950,#38848c)"}}>
                <div style={{ width: "30%" }}>
                    {this.sidebar()}
                </div>
                {this.header()}
                <div style={{ height: "100vh" }}>
                    {this.props.children}
                </div>
                {this.footer()}
            </div>
        )
    }
}
export default Container;