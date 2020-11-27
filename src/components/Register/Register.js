import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import '../userSelection.css';
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const regExp = RegExp(
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
)

const baseUrl= "http://localhost:8080/";

class Register extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            platform: ''
        }
    }

    handleChange = (event) => {
        this.setState({platform : event.target.value});
    };

    validate = () => {
        const self = this;
        if(document.getElementById("email").value !== "" && document.getElementById("userName").value !== ""
        && document.getElementById("password").value !== "" && document.getElementById("confirmPassword").value !== ""
            && self.state.platform !== "" &&  self.state.platform != null
        && document.getElementById("platformID").value !== "" && document.getElementById("wishlist").value !== ""){
            if(document.getElementById("password").value === document.getElementById("confirmPassword").value){
                if(regExp.test(document.getElementById("email").value)) {
                    axios.post(baseUrl + "users/new?name=" + document.getElementById("userName").value + "&email=" + document.getElementById("email").value + "&password=" + document.getElementById("password").value
                        + "&platform=" + self.state.platform + "&platformID=" + document.getElementById("platformID").value + "&wishlist=" + document.getElementById("wishlist").value)
                        .then((response) => {
                            localStorage.setItem('creds', window.btoa(document.getElementById("userName").value + ":" + document.getElementById("password").value));
                            localStorage.setItem('userId', response.data.userId);
                            localStorage.setItem('userName', response.data.userName);
                            document.getElementById("registerForm").style.display = 'none';
                            document.getElementById("welcome").style.display = 'block';
                        }).catch((e) => {
                            console.log(e.response.data);
                        alert("There is already a user in our system with that username or email. Please try again!")
                    });
                } else {
                    alert("The provided email address is not recognized as an email address. Please correct it.")
                }
            } else {
                alert("Password and confirm password don't have the same value. Please make sure they are identical!")
            }
        } else {
            alert("Not all fields have been filled in. Please fill in the missing fields.");
        }
    }

    render() {
        return(
            <div>
                <div classname="registerForm" id="registerForm">
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
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
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
                            InputLabelProps={{
                                shrink: true,
                            }}
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
                            InputLabelProps={{
                                shrink: true,
                            }}
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
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>Platform</InputLabel>
                            <Select
                                id="platform"
                                variant="outlined"
                                value = {this.state.platform}
                                onChange= {this.handleChange}
                                fullWidth
                            >
                                <MenuItem value={"NINTENDOSWITCH"}>Nintendo Switch</MenuItem>
                                <MenuItem value={"PLAYSTATION"}>PlayStation</MenuItem>
                                <MenuItem value={"XBOX"}>XBox</MenuItem>
                                <MenuItem value={"PC"}>PC</MenuItem>
                            </Select>
                        {/*<h5>Platform</h5>*/}
                        {/*<RadioGroup id="platform" className="selectGroup" name="platform">*/}
                        {/*    <FormControlLabel value="switch" control={<Radio id="switch" />} label="Nintendo Switch" checked={true}/>*/}
                        {/*    <FormControlLabel value="playstation" control={<Radio id="playstation" />} label="PlayStation" />*/}
                        {/*    <FormControlLabel value="xbox" control={<Radio id="xbox" />} label="XBox"/>*/}
                        {/*    <FormControlLabel value="pc" control={<Radio id="pc" />} label="PC"/>*/}
                        {/*</RadioGroup>*/}
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
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            variant="outlined"
                            margin="normal"
                            id="wishlist"
                            name="wishlist"
                            label="Items you really want, separated by a comma"
                            fullWidth
                            autoComplete="wishlist"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>
                <div className="saveBtn">
                    <Button variant="contained" color="primary" onClick={this.validate}>Save</Button>
                </div>
                </div>
                <div className="welcome" id="welcome">
                    <React.Fragment>
                        <Typography variant="h5" gutterBottom>
                            Your registration has been completed.
                        </Typography>
                        <Typography variant="subtitle1">
                            Enjoy using RLStop. Good luck trading!
                        </Typography>
                        <Button color="primary" variant="contained" href="/">
                            Go to trades
                        </Button>
                    </React.Fragment>
                </div>
            </div>
        );
    }
}

export default Register;