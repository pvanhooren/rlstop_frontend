import React from "react";
import axios from 'axios';

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import "../Overview.css";
import "../userSelection.css";
import Grid from "@material-ui/core/Grid";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

import '../userSelection.css';
import AuthenticationService from "../../services/AuthenticationService";

const regExp = RegExp(
    /^[a-zA-Z0-9-.]+@[a-zA-Z0-9-.]+\.[A-Za-z]+$/
)

var headers = {};
const baseUrl = AuthenticationService.baseUrl;

class Settings extends React.Component {
    constructor(props) {
        super(props);

        headers = AuthenticationService.getHeaders();

        this.state = {
            user: Object,
            userNameError: false,
            userNameErrorText: "",
            emailError: false,
            emailErrorText: "",
            friendCodeError: false,
            friendCodeErrorText: "",
        }
    }

    getUserInfo() {
        axios.get(baseUrl + "users/" + localStorage.getItem("userId"), {
                headers: headers
            }
        ).then(response => {
                this.setState({user: response.data})
                document.getElementById("email").value = response.data.emailAddress;
                document.getElementById("username").value = response.data.userName;
                document.getElementById("platformID").value = response.data.platformID;
            }
        ).catch((e) => {
            if (e.response != null) {
                document.getElementById('serverError').style.display = 'block'
            } else {
                AuthenticationService.logOut(this.props.history)
            }
        });
    }

    componentDidMount() {
        if (AuthenticationService.isLoggedIn()) {
            this.getUserInfo();
        } else {
            this.props.history.push("/me/login")
        }
    }

    promptDelete = () => {
        var r = prompt("Are you sure that you want to delete your account? Please type " + this.state.user.userName + " to confirm.")

        if (r == this.state.user.userName) {
            this.deleteAccount();
        }
    }

    deleteAccount = async () => {
        await axios.delete(baseUrl + "users/" + this.state.user.userId, {
                headers: headers
            }
        ).then((response) => {
            AuthenticationService.logOut(this.props.history)
        }).catch((e) => {
            document.getElementById('serverError').style.display = 'block'
        });
    }

    saveSettings = async () => {
        this.setState({
            emailError: false,
            userNameError: false,
            userNameErrorText: "",
            emailErrorText: "",
            friendCodeError: false,
            friendCodeErrorText: ""
        })

        var anyError = false;
        var selectedPlatform = this.state.user.platform;
        if (document.getElementById("switch").checked) {
            selectedPlatform = "NINTENDOSWITCH"
        } else if (document.getElementById("playstation").checked) {
            selectedPlatform = "PLAYSTATION"
        } else if (document.getElementById("xbox").checked) {
            selectedPlatform = "XBOX"
        } else if (document.getElementById("pc").checked) {
            selectedPlatform = "PC"
        }

        if (regExp.test(document.getElementById("email").value)) {
            await axios.put(baseUrl + "users/" + localStorage.getItem('userId') + "?name=" + document.getElementById("username").value + "&email=" + document.getElementById("email").value + "&platform=" + selectedPlatform + "&platformID=" + document.getElementById("platformID").value, null, {
                    headers: headers
                }
            ).catch((e) => {
                anyError = true;
                if (e.response.data.message.includes("username")) {
                    this.setState({
                        userNameError: true,
                        userNameErrorText: e.response.data.message
                    })
                } else if (e.response.data.message.includes("email")) {
                    this.setState({
                        emailError: true,
                        emailErrorText: e.response.data.message
                    })
                } else {
                    this.setState({
                        emailError: true,
                        userNameError: true,
                        friendCodeError: true,
                        friendCodeErrorText: e.response.data.message
                    })
                }
            })
        } else {
            this.setState({
                emailError: true,
                emailErrorText: "The provided email address is not recognized as an email address. Please correct it."
            })
            anyError = true;
        }

        if (!anyError) {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div>
                <div className="mainArea" id="userSettings">
                    <h2 className="title">User settings</h2>
                    <div className="serverError" id="serverError">
                        It looks like something went wrong on our end, our apologies for the inconvenience. Please try
                        again later!
                    </div>
                    <Grid container spacing={3}>
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
                                       InputLabelProps={{
                                           shrink: true,
                                       }}
                                // defaultValue={this.state.user.emailAddress}
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
                                id="username"
                                autoComplete="username"
                                error={this.state.userNameError}
                                helperText={this.state.userNameErrorText}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <h5>Platform (Current: {this.state.user.platform})</h5>
                            <RadioGroup id="platform" className="selectGroup" name="platform">
                                <FormControlLabel value="switch" control={<Radio id="switch"/>}
                                                  label="Nintendo Switch"/>
                                <FormControlLabel value="playstation" control={<Radio id="playstation"/>}
                                                  label="PlayStation"/>
                                <FormControlLabel value="xbox" control={<Radio id="xbox"/>} label="XBox"/>
                                <FormControlLabel value="pc" control={<Radio id="pc"/>} label="PC"/>
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="platformID"
                                name="platformID"
                                label="Friend code / Platform username"
                                fullWidth
                                autoComplete="platformID"
                                error={this.state.friendCodeError}
                                helperText={this.state.friendCodeErrorText}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <div className="saveBtn">
                        <Button className="marginBtn" variant="contained" color="primary"
                                onClick={this.saveSettings}>Save</Button>
                        <Button variant="contained" color="secondary" onClick={this.promptDelete}>Delete
                            account</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;