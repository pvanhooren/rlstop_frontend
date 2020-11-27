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

const baseUrl= "http://localhost:8080/";

class Settings extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            user: Object
        }
    }

    getUserInfo() {
        if(localStorage.getItem("userId") != null){
            axios.get(baseUrl + "users/" + localStorage.getItem("userId"), {
                headers : {
                        withCredentials: true,
                        authorization: 'Basic ' + localStorage.getItem("creds")
                }}).then(response => {
                    this.setState({ user: response.data })
                document.getElementById("email").value = response.data.emailAddress;
                document.getElementById("username").value = response.data.userName;
                document.getElementById("platformID").value = response.data.platformID;
                }
            ).catch((e) => {
                this.props.history.push("/me/login");
            });
        } else {
            this.props.history.push("/me/login");
        }
    }

    componentDidMount() {
        this.getUserInfo();
    }

    saveSettings = async() => {
        await axios.put(baseUrl + "users/" + localStorage.getItem('userId') + "?name=" + document.getElementById("username").value + "&email=" + document.getElementById("email").value + "&platformID=" + document.getElementById("platformID").value, null,{
            headers : {
                withCredentials: true,
                authorization: 'Basic ' + localStorage.getItem("creds")
            }}).catch((e) => {
            alert("Something went wrong changing settings. Please try again!")
        })

        if(document.getElementById("switch").checked){
            await axios.put(baseUrl + "users/" + localStorage.getItem('userId') +  "?platform=NINTENDOSWITCH",null,{
                headers : {
                    withCredentials: true,
                    authorization: 'Basic ' + localStorage.getItem("creds")
                }});
        } else if (document.getElementById("playstation").checked) {
            await axios.put(baseUrl + + "users/" + localStorage.getItem('userId') + "?platform=PLAYSTATION", null, {
                    headers : {
                        withCredentials: true,
                        authorization: 'Basic ' + localStorage.getItem("creds")
                    }});
        } else if (document.getElementById("xbox").checked) {
            await axios.put(baseUrl + + "users/" + localStorage.getItem('userId') + "?platform=XBOX", null, {
                headers : {
                    withCredentials: true,
                    authorization: 'Basic ' + localStorage.getItem("creds")
                }});
        } else if (document.getElementById("pc").checked) {
            await axios.put(baseUrl + +"users/" + localStorage.getItem('userId') + "?platform=PC", null, {
                headers : {
                    withCredentials: true,
                    authorization: 'Basic ' + localStorage.getItem("creds")
                }});
        }

        this.props.history.push("/")
    }

    render(){
        return(
          <div>
              <div className="mainArea" id="userSettings">
                  <h2 className="title">User settings</h2>
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
                      InputLabelProps={{
                          shrink: true,
                      }}
                      // defaultValue={this.state.user.userName}
                  />
                      </Grid>
                      <Grid item xs={12}>
                          <h5>Platform</h5>
                          <RadioGroup id="platform" className="selectGroup" name="platform">
                              <FormControlLabel value="switch" control={<Radio id="switch" />} label="Nintendo Switch" checked={this.state.user.platform === "NINTENDOSWITCH"} />
                              <FormControlLabel value="playstation" control={<Radio id="playstation" />} label="PlayStation" checked={this.state.user.platform === "PLAYSTATION"} />
                              <FormControlLabel value="xbox" control={<Radio id="xbox" />} label="XBox" checked={this.state.user.platform === "XBOX"}/>
                              <FormControlLabel value="pc" control={<Radio id="pc" />} label="PC" checked={this.state.user.platform === "PC"}/>
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
                              InputLabelProps={{
                                  shrink: true,
                              }}
                              // defaultValue={this.state.user.platformID}
                          />
                      </Grid>
                  </Grid>
                  <div className="saveBtn">
                  <Button variant="contained" color="primary" onClick={this.saveSettings}>Save</Button>
                  </div>
                  </div>
          </div>
        );
    }
}

export default Settings;