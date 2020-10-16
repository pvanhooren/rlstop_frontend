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
import { withRouter } from "react-router-dom";
import "./Navbar.css";

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        [theme.breakpoints.down("xs")]: {
            flexGrow: 1
        }
    }
}));

const Navbar = props => {
    const { history } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClick = pageURL => {
        history.push(pageURL);
        setAnchorEl(null);
    };

    const handleButtonClick = pageURL => {
        history.push(pageURL);
    };

    const menuItems = [
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
        },
        // {
        //     menuTitle: "Sprint 2 demo",
        //     pageURL: "/demo"
        // },
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
    ];

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
                            </Menu>
                        </>
                    ) : (
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
                            <Button
                                className="btn"
                                onClick={handleMenu}
                            >
                                PROFILE
                            </Button>
                            <Menu
                                id="profile-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                            >
                                <MenuItem onClick={() => handleMenuClick("/me/wishlist")}>Wishlist</MenuItem>
                                <MenuItem onClick={() => handleMenuClick("/me/trades")}>My trades</MenuItem>
                                <MenuItem onClick={() => handleMenuClick("/me/settings")}>Settings</MenuItem>
                                <MenuItem onClick={() => handleMenuClick("/me/logout")}>Log out</MenuItem>
                            </Menu>

                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withRouter(Navbar);