import React from "react";
import {makeStyles, useTheme} from "@material-ui/core/styles";
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
import AuthenticationService from "../../services/AuthenticationService";

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
    const {history} = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
    var isLoggedIn = false;

    if (localStorage.getItem('token') != null & localStorage.getItem('token') !== "") {
        isLoggedIn = true;
    }


    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClick = pageURL => {
        console.log(pageURL);
        if (pageURL !== "/me/logout") {
            history.push(pageURL);
            setAnchorEl(null);
        } else {
            signOut();
        }
    };

    function signOut() {
        AuthenticationService.logOut(history);
        setAnchorEl(null);
    }

    const handleButtonClick = pageURL => {
        history.push(pageURL);
    };

    function getUserName() {
        if (localStorage.getItem('userName') != null) {
            return localStorage.getItem('userName');
        }
        return "ACCOUNT"
    }

    const loggedInItems = [
        {
            menuTitle: "Wishlist",
            pageURL: "/me/wishlist"
        },
        {
            menuTitle: "My trades",
            pageURL: "/me/trades"
        },
        {
            menuTitle: "Interesting trades",
            pageURL: "/me/interested"
        },
        {
            menuTitle: "Settings",
            pageURL: "/me/settings"
        },
        {
            menuTitle: "Sign out",
            pageURL: "/me/logout"
        }
    ]

    const loggedOutItems = [
        {
            menuTitle: "Log in",
            pageURL: "/me/login"
        },
        {
            menuTitle: "Register",
            pageURL: "/me/register"
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
    ]

    var adminItem = [
        {
            menuTitle: "People",
            pageURL: "/people"
        }
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
                                <MenuIcon/>
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
                                    const {menuTitle, pageURL} = menuItem;
                                    return (
                                        <MenuItem onClick={() => handleMenuClick(pageURL)}>
                                            {menuTitle}
                                        </MenuItem>
                                    );
                                })}
                                {localStorage.getItem('adminCode') == AuthenticationService.adminCode ? (
                                    adminItem.map(menuItem => {
                                        const {menuTitle, pageURL} = menuItem;
                                        return (
                                            <MenuItem onClick={() => handleMenuClick(pageURL)}>
                                                {menuTitle}
                                            </MenuItem>
                                        );
                                    })) : <></> }
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
                                {localStorage.getItem('adminCode') == AuthenticationService.adminCode ?
                                    <Button
                                        className="btn"
                                        onClick={() => handleButtonClick("/people")}
                                    >
                                        PEOPLE
                                    </Button> : <></>
                                }
                            </div>
                            <div>
                                <Button
                                    className={classes.profileTab}
                                    onClick={handleMenu}
                                >
                                    <Avatar className={classes.avatar}>
                                        <PermIdentity/>
                                    </Avatar>
                                    {getUserName()}
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
                                            <MenuItem
                                                onClick={() => handleMenuClick("/me/wishlist")}>Wishlist</MenuItem>
                                            <MenuItem onClick={() => handleMenuClick("/me/trades")}>My trades</MenuItem>
                                            <MenuItem onClick={() => handleMenuClick("/me/interested")}>Interesting
                                                trades</MenuItem>
                                            <MenuItem
                                                onClick={() => handleMenuClick("/me/settings")}>Settings</MenuItem>
                                            <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
                                        </>
                                    ) : (
                                        <>
                                            <MenuItem onClick={() => handleMenuClick("/me/login")}>Sign in</MenuItem>
                                            <MenuItem
                                                onClick={() => handleMenuClick("/me/register")}>Register</MenuItem>
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