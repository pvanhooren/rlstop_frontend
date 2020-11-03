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
            users: [],
            userId: 0,
            user: Object
        }
    }

    selectUser = async() =>{
        this.setState({userId: document.getElementById("userSelect").value});
        document.getElementById("userSettings").style.display = "block";

        await axios.get(baseUrl + "users/" + document.getElementById("userSelect").value).then(
            result => {
                this.setState({user: result.data})
            }
        )

        document.getElementById("email").value = this.state.user.emailAddress;
        document.getElementById("username").value = this.state.user.userName;
        document.getElementById("platformID").value = this.state.user.platformID;
    }

    componentDidMount() {
        this.getAllUsers();
    }

    getAllUsers() {
        axios.get(baseUrl + "users/all").then(
            result => {
                this.setState({users: result.data})
            }
        )
    }

    saveSettings = async() => {
        await axios.put(baseUrl + "users/" + this.state.user.userId + "?name=" + document.getElementById("username").value + "&email=" + document.getElementById("email").value + "&platformID=" + document.getElementById("platformID").value);

        if(document.getElementById("switch").checked){
            await axios.put(baseUrl + "users/" + this.state.user.userId +  "?platform=NintendoSwitch");
        } else if (document.getElementById("playstation").checked) {
            await axios.put(baseUrl + + "users/" + this.state.user.userId + "?platform=PlayStation");
        } else if (document.getElementById("xbox").checked) {
            await axios.put(baseUrl + + "users/" + this.state.user.userId + "?platform=XBox");
        } else if (document.getElementById("pc").checked) {
            await axios.put(baseUrl + +"users/" + this.state.user.userId + "?platform=PC");
        }

        window.location.reload(false);
    }

    render(){
        return(
          <div>
              <div className="selectArea">
                  <h2>User settings</h2>
                  <label>I am...</label>
                  <select className="userSelect" id="userSelect" name="user">
                      {this.state.users.map(el => <option value={el.userId} key={el.userId}> {el.userName} </option>)}
                  </select>
                  <Button className="btnMargin" onClick={this.selectUser} variant="contained" color="primary">Confirm</Button>
                  <br/><br/>
              </div>
              <div className="AreaToMakeVisible" id="userSettings">
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
                              <FormControlLabel value="switch" control={<Radio id="switch" />} label="Nintendo Switch" checked={this.state.user.platform === "NintendoSwitch"} />
                              <FormControlLabel value="playstation" control={<Radio id="playstation" />} label="PlayStation" checked={this.state.user.platform === "PlayStation"} />
                              <FormControlLabel value="xbox" control={<Radio id="xbox" />} label="XBox" checked={this.state.user.platform === "XBox"}/>
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