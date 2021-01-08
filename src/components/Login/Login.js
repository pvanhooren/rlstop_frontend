import React, {useState, useEffect} from 'react'
import axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import {makeStyles} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AuthenticationService from "../../services/AuthenticationService";

const baseUrl = AuthenticationService.baseUrl;

const pictures = ["https://external-preview.redd.it/imgbPVFzVG6Z2JCWMlZad5f7j_owyrXhdfl1hWxdODw.jpg?auto=webp&s=6d5843694cafc8d35373d1a127db89583944c0df", "https://cdn.arstechnica.net/wp-content/uploads/2020/07/rocket-league-f2p-800x450.jpg", "https://i.imgur.com/VKTRyTo.jpg", "https://images.nintendolife.com/ccf6773e6c081/1280x720.jpg", "https://i.redd.it/wzo7vby81n011.png"]

const random = Math.round(Math.random() * 4);

const useStyles = makeStyles((theme) => ({
    root: {
        height: '90.1vh',
    },
    image: {
        backgroundImage: 'url(' + pictures[random] + ')',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        cursor: "pointer"
    }
}));

export default function SignIn(props) {
    const [userNameError, setUserNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorText, setPasswordErrorText] = useState("");

    const classes = useStyles();
    const {history} = props;

    useEffect(() => {
        if (localStorage.getItem('token') != null & localStorage.getItem('token') !== "") {
            history.push("/")
        }
    })

    async function signIn() {
        setPasswordErrorText("");
        setPasswordError(false);
        setUserNameError(false);
        if (document.getElementById("username").value !== "" && document.getElementById("password").value !== "") {
            await axios.get(baseUrl + "users/auth?creds=" + window.btoa(document.getElementById("username").value + ':' + document.getElementById("password").value))
            .then(response => {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', response.data.userId);
                    localStorage.setItem('userName', response.data.userName);
                    localStorage.setItem('adminCode', response.data.adminCode);
                    history.push("/");
                }
            ).catch((e) => {
                    setUserNameError(true);
                    setPasswordError(true);
                    if (e.response != null) {
                        setPasswordErrorText(e.response.data.message);
                        // if(e.response.status == '400') {
                        //     setPasswordErrorText("Your account has been banned from the application. Send an email to support@rlstop.com if you'd like to discuss the ban.")
                        // } else {
                        //     setPasswordErrorText("Incorrect username or password. Please try again!");
                        // }
                    } else {
                        setPasswordErrorText("Something went wrong at our end. Please visit again later!")
                    }
                }
            )
        } else {
            setUserNameError(true);
            setPasswordError(true);
            setPasswordErrorText("Please fill in both username and password!");
        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} elevation={6} component={Paper} square>
                <div id="login" style={{display: 'block'}}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline/>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <form className={classes.form} noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    error={userNameError}
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    error={passwordError}
                                    helperText={passwordErrorText}
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={signIn}
                                >
                                    Sign In
                                </Button>
                                <Link onClick={() => history.push("/me/register")} className={classes.link}
                                      variant="body2">
                                    Don't have an account?
                                    {" Sign Up"}
                                </Link>
                            </form>
                        </div>
                    </Container>
                </div>
            </Grid>
        </Grid>
    );
}