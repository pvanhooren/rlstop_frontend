import React, {useState} from 'react'
import axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const baseUrl= "http://localhost:8080/";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '90.1vh',
    },
    image: {
        backgroundImage: 'url(https://cdn.arstechnica.net/wp-content/uploads/2020/07/rocket-league-f2p-800x450.jpg)',
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
    link:{
        cursor:"pointer"
    }
}));

export default function SignIn(props) {
    const [userNameError, setUserNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorText, setPasswordErrorText] = useState("");

    const classes = useStyles();
    const { history } = props;

    function signIn(){
        setPasswordErrorText(""); setPasswordError(false); setUserNameError(false);
        if(document.getElementById("username").value !== "" && document.getElementById("password").value !== "") {
            axios.get(baseUrl + "users/name/" + document.getElementById("username").value , {
                headers : {
                    withCredentials : true,
                    authorization : 'Basic ' + window.btoa(document.getElementById("username").value + ':' + document.getElementById("password").value)
                }}).then(response => {
                    localStorage.setItem('creds', window.btoa(document.getElementById("username").value + ":" + document.getElementById("password").value));
                    localStorage.setItem('userId', response.data.userId);
                    localStorage.setItem('userName', response.data.userName);
                    history.push("/");
                }
            ).catch((e) => {
                    setUserNameError(true);
                    setPasswordError(true);

                    setPasswordErrorText("Incorrect username or password. Please try again!");
                    // setPasswordErrorText("Our apologies, it seems like there are server issues. Please come back later");
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
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} elevation={6} component={Paper} square>
        <div id="login" style={{display:'block'}}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
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
                        onClick = {signIn}
                    >
                        Sign In
                    </Button>
                            <Link onClick={() => history.push("/me/register")} className={classes.link} variant="body2">
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