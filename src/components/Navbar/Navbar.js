import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {withRouter} from "react-router-dom";
import "./Navbar.css";
import PermIdentity from '@material-ui/icons/PermIdentity';
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        [theme.breakpoints.down("xs")]: {
            flexGrow: 1
        }
    },
    profileTab: {
        marginLeft: 5,
        color: "white"
    },
    avatar: {
        margin: theme.spacing(1),
        color: "blue",
        backgroundColor: "white"
    }
}));

const Navbar = props => {
    const { history } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
    var isLoggedIn = false;

    if(localStorage.getItem('creds') != null & localStorage.getItem('creds') !== ""){
        isLoggedIn = true;
    }


    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClick = pageURL => {
        if(pageURL !== "/me/logout") {
            history.push(pageURL);
            setAnchorEl(null);
        } else {
            signOut();
        }
    };

    function signOut(){
        localStorage.clear();
        history.push("/me/login")
    };

    const handleButtonClick = pageURL => {
        history.push(pageURL);
    };

    const loggedInItems = [
        {
            menuTitle: "Wishlist",
            pageURL: "/me/wishlist"
        },
        {
            menuTitle: "My trades",
            pageUrl: "/me/trades"
        },
        {
            menuTitle: "Settings",
            pageUrl: "/me/settings"
        },
        {
            menuTitle: "Log out",
            pageUrl: "/me/logout"
        }
    ]

    const loggedOutItems = [
        {
            menuTitle: "Log in",
            pageUrl: "me/login"
        },
        {
            menuTitle: "Register",
            pageUrl: "/me/register"
        }
    ]

    var menuItems = [
        {
            menuTitle: "Trades",
            pageURL: "/"
        },
        {
            menuTitle: "Create trade",
            pageURL: "/new"
        },
        {
            menuTitle: "People",
            pageURL: "/people"
        }
        // {
        //     menuTitle: "Sprint 2 demo",
        //     pageURL: "/demo"
        // },
    ]

    return (
        <div className="root">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        RLStop
                    </Typography>
                    {isMobile ? (
                        <>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                                onClick={handleMenu}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                open={open}
                                onClose={() => setAnchorEl(null)}
                            >
                                {menuItems.map(menuItem => {
                                    const { menuTitle, pageURL } = menuItem;
                                    return (
                                        <MenuItem onClick={() => handleMenuClick(pageURL)}>
                                            {menuTitle}
                                        </MenuItem>
                                    );
                                })}
                                {isLoggedIn ? (
                                    loggedInItems.map(menuItem => {
                                        const {menuTitle, pageURL} = menuItem;
                                        return (
                                            <MenuItem onClick={() => handleMenuClick(pageURL)}>
                                                {menuTitle}
                                            </MenuItem>
                                        );
                                    })) : (
                                    loggedOutItems.map(menuItem => {
                                    const {menuTitle, pageURL} = menuItem;
                                    return (
                                        <MenuItem onClick={() => handleMenuClick(pageURL)}>
                                            {menuTitle}
                                        </MenuItem>
                                    );
                                }))}
                            </Menu>
                        </>
                    ) : (
                        <>
                        <div className="header">
                            <Button
                                className="btn"
                                onClick={() => handleButtonClick("/")}
                            >
                                TRADES
                            </Button>
                            <Button
                                className="btn"
                                onClick={() => handleButtonClick("/new")}
                            >
                                NEW TRADE
                            </Button>
                            <Button
                                className="btn"
                                onClick={() => handleButtonClick("/people")}
                            >
                                PEOPLE
                            </Button>
                            {/*<Button*/}
                            {/*    className="btn"*/}
                            {/*    onClick={() => handleButtonClick("/demo")}*/}
                            {/*>*/}
                            {/*    DEMO*/}
                            {/*</Button>*/}
                        </div>
                            <div>
                            <Button
                                className={classes.profileTab}
                                onClick={handleMenu}
                            >
                                <Avatar className={classes.avatar}>
                                    <PermIdentity />
                                </Avatar>
                                ACCOUNT
                            </Button>
                            <Menu
                                id="profile-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                            >
                                {isLoggedIn ? (
                                    <>
                                    <MenuItem onClick={() => handleMenuClick("/me/wishlist")}>Wishlist</MenuItem>
                                    <MenuItem onClick={() => handleMenuClick("/me/trades")}>My trades</MenuItem>
                                    <MenuItem onClick={() => handleMenuClick("/me/settings")}>Settings</MenuItem>
                                    <MenuItem onClick={() => signOut() }>Log out</MenuItem>
                                    </>
                                    ) : (
                                    <>
                                    <MenuItem onClick={() => handleMenuClick("/me/login")}>Sign in</MenuItem>
                                        <MenuItem onClick={() => handleMenuClick("/me/register")}>Register</MenuItem>
                                    </>
                                    )}
                            </Menu>
                            </div>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(Navbar);