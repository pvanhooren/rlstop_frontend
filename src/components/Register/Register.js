import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

import "./Register.css"
import AuthenticationService from "../../services/AuthenticationService";

const regExp = RegExp(
    /^[a-zA-Z0-9-.]+@[a-zA-Z0-9-.]+\.[A-Za-z]+$/
)

const baseUrl = AuthenticationService.baseUrl;

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            platform: '',
            emailError: false,
            emailErrorText: '',
            userNameError: false,
            passwordError: false,
            passwordErrorText: '',
            platformErrorText: '',
            confirmPasswordError: false,
            platformError: false,
            platformIDError: false,
        }
    }

    componentDidMount() {
        if (localStorage.getItem('token') != null && localStorage.getItem('token') !== "") {
            this.props.history.push("/")
        }
    }

    handleChange = (event) => {
        this.setState({platform: event.target.value});
    };

    validate = () => {
        const self = this;
        self.setState({
            emailError: false,
            emailErrorText: '',
            userNameError: false,
            userNameErrorText: "",
            passwordError: false,
            passwordErrorText: '',
            platformErrorText: '',
            confirmPasswordError: false,
            platformError: false,
            platformIDError: false,
        })

        if (document.getElementById("password").value === document.getElementById("confirmPassword").value) {
            if (regExp.test(document.getElementById("email").value)) {
                let creds = window.btoa(document.getElementById("userName").value + ":" + document.getElementById("password").value);
                axios.post(baseUrl + "users/new?creds=" + creds + "&email=" + document.getElementById("email").value
                    + "&platform=" + self.state.platform + "&platformID=" + document.getElementById("platformID").value)
                    .then((response) => {
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('userId', response.data.userId);
                        localStorage.setItem('userName', response.data.userName);
                        localStorage.setItem('isAdmin', response.data.isAdmin);
                        document.getElementById("registerForm").style.display = 'none';
                        document.getElementById("welcome").style.display = 'block';
                    }).catch((e) => {
                    if (e.response.data.message.includes("username")) {
                        self.setState({
                            userNameError: true,
                            userNameErrorText: e.response.data.message
                        })
                    } else if (e.response.data.message.includes("email")) {
                        self.setState({
                            emailError: true,
                            emailErrorText: e.response.data.message
                        })
                    } else {
                        self.setState({
                            platformErrorText: e.response.data.message,
                            emailError: true,
                            userNameError: true,
                            passwordError: true,
                            confirmPasswordError: true,
                            platformError: true,
                            platformIDError: true,
                        })
                    }

                });
            } else {
                self.setState({
                    emailError: true,
                    emailErrorText: "The provided email address is not recognized as an email address. Please correct it."
                })
            }
        } else {
            self.setState({
                passwordError: true,
                confirmPasswordError: true,
                passwordErrorText: "Password and confirm password don't have the same value. Please make sure they are identical!"
            })
        }
    }

    render() {
        return (
            <div>
                <div className="registerForm" id="registerForm">
                    <h2 className="title">Create your account!</h2>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField variant="outlined"
                                       margin="normal"
                                       required
                                       fullWidth
                                       id="email"
                                       label="Email Address"
                                       name="email"
                                       autoComplete="email"
                                       error={this.state.emailError}
                                       helperText={this.state.emailErrorText}
                                       autoFocus/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="username"
                                label="Username"
                                id="userName"
                                autoComplete="username"
                                error={this.state.userNameError}
                                helperText={this.state.userNameErrorText}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                type="password"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                id="password"
                                error={this.state.passwordError}
                                helperText={this.state.passwordErrorText}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                type="password"
                                required
                                fullWidth
                                name="password"
                                label="Confirm password"
                                id="confirmPassword"
                                error={this.state.confirmPasswordError}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel>Platform</InputLabel>
                            <Select
                                id="platform"
                                variant="outlined"
                                value={this.state.platform}
                                onChange={this.handleChange}
                                error={this.state.platformError}
                                fullWidth
                            >
                                <MenuItem value={"NINTENDOSWITCH"}>Nintendo Switch</MenuItem>
                                <MenuItem value={"PLAYSTATION"}>PlayStation</MenuItem>
                                <MenuItem value={"XBOX"}>XBox</MenuItem>
                                <MenuItem value={"PC"}>PC</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                variant="outlined"
                                margin="normal"
                                id="platformID"
                                name="platformID"
                                label="Friend code / Platform username"
                                fullWidth
                                autoComplete="platformID"
                                error={this.state.platformIDError}
                                helperText={this.state.platformErrorText}
                            />
                        </Grid>
                    </Grid>
                    <div className="saveBtn">
                        <Button variant="contained" color="primary" onClick={this.validate}>Save</Button>
                    </div>
                </div>
                <div className="welcome" id="welcome">
                    <Grid container component="main" style={{height: '90.1vh'}}>
                        <CssBaseline/>
                        <Grid item xs={false} sm={4} md={7} className="image"/>
                        <Grid item xs={12} sm={8} md={5} elevation={6} component={Paper} square>
                            <div id="login" style={{display: 'block'}}>
                                <Container component="main" maxWidth="xs">
                                    <CssBaseline/>
                                    <div className="welcomeText">
                                        <Typography variant="h5" gutterBottom>
                                            Your registration has been completed.
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Enjoy using RLStop. Good luck trading!
                                        </Typography>
                                        <Button className="topBtn" color="primary" variant="contained"
                                                onClick={() => this.props.history.push("/")}>
                                            Go to trades
                                        </Button><br/>
                                        <Button color="primary" variant="outlined"
                                                onClick={() => this.props.history.push("/me/wishlist")}>
                                            Make a wishlist
                                        </Button>
                                    </div>
                                </Container>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Register;