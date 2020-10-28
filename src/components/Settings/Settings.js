import React from "react";
import Button from "@material-ui/core/Button";

import "../Overview.css";
import "../userSelection.css";

class Settings extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            userId: 0
        }
    }

    componentDidMount() {
        this.getAllUsers();
    }

    getAllUsers() {
        fetch("http://localhost:8080/users/all").then(rse => rse.json()).then(
            result => {
                this.setState({users: result})
            }
        )
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

              </div>
          </div>
        );
    }
}

export default Settings;