import React, { Component } from 'react'
import './Overview.css';
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import {withRouter} from "react-router-dom";

class Overview extends Component {
    constructor(props){
        super(props);

        this.state = {
            trades: [],
            tradeId: 0,
            userId: 0,
            wants: "",
            offers: ""
        }

    }

    showEditForm(trade) {
        this.setState({ tradeId: trade.postId, userId: trade.user.userId, wants: trade.wants, offers: trade.offers})
        document.getElementById("filter").style.display = "none";
        document.getElementById("editForm").style.display = "block";
    }

    editTrade = () =>{
        const self = this;
        if(document.getElementById("wants").value != "" && document.getElementById("offers").value != "") {
            fetch("http://localhost:8080/trades/" + self.state.tradeId + "?wants=" + document.getElementById("wants").value + "&offers=" + document.getElementById("offers").value + "&userId=" + self.state.userId, {method: 'PUT'});
            //console.log("http://localhost:8080/trades/" + self.state.tradeId + "?wants=" + document.getElementById("wants").value + "&offers=" + document.getElementById("offers").value + "&userId=" + self.state.userId);
            document.getElementById("editForm").style.display = "none";
            document.getElementById("filter").style.display = "block";
            window.location.reload(false);
        } else {
            alert("The trade cannot be edited because it is not complete. Please fill in the empty fields.")
        }
    }

    cancelEdit(){
        document.getElementById("editForm").style.display = "none";
        document.getElementById("filter").style.display = "block";
    }

    deleteTrade(tradeId){
        fetch("http://localhost:8080/trades/" + tradeId, {method:'DELETE'})
        window.location.reload(false);
    }

    getAllTrades = () => {
        const self = this;
        fetch("http://localhost:8080/trades/all").then(rse => rse.json()).then(
            result => {
                self.setState({trades: result});
            }
        )
    }

    getFilteredTrades = () =>{
        const self = this;
        if(document.getElementById("switch").checked){
            fetch("http://localhost:8080/trades/filter?platform=NintendoSwitch").then(rse => rse.json()).then(
                result => {
                    self.setState({trades: result});
                }
            )
        } else if (document.getElementById("playstation").checked) {
            fetch("http://localhost:8080/trades/filter?platform=PlayStation").then(rse => rse.json()).then(
                result => {
                    self.setState({trades: result});
                }
            )
        } else if (document.getElementById("xbox").checked) {
            fetch("http://localhost:8080/trades/filter?platform=XBox").then(rse => rse.json()).then(
                result => {
                    self.setState({trades: result});
                }
            )
        } else if (document.getElementById("pc").checked) {
            fetch("http://localhost:8080/trades/filter?platform=PC").then(rse => rse.json()).then(
                result => {
                    self.setState({trades: result});
                }
            )
        } else {
            alert("No filter is selected, so all trades will be displayed.")
            this.getAllTrades();
        }
    }

    componentDidMount() {
        this.getAllTrades();
    }

    render (){
        return (
            <div className="trades">
                <div className="tableContainer">
                <h2>All trades</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Wants</th>
                        <th>Offers</th>
                        <th>Username</th>
                        <th>Platform</th>
                        <th>Friend ID</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.trades.map(trade=>(
                        <tr key={trade.postId}>
                            <td>{trade.postId}</td>
                            <td>{trade.wants}</td>
                            <td>{trade.offers}</td>
                            <td>{trade.user.userName}</td>
                            <td>{trade.user.platform}</td>
                            <td>{trade.user.platformID}</td>
                            <td><button onClick={() => this.showEditForm(trade)} className="edit"></button></td>
                            <td><button onClick={() => this.deleteTrade(trade.postId)} className="delete"></button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                <div id="filter" className="filter">
                    <br /><br />
                    <RadioGroup id="platform" aria-label="Filter by platform:" name="platform">
                        <FormControlLabel value="switch" control={<Radio id="switch" />} label="Nintendo Switch" />
                        <FormControlLabel value="playstation" control={<Radio id="playstation" />} label="PlayStation" />
                        <FormControlLabel value="xbox" control={<Radio id="xbox" />} label="XBox" />
                        <FormControlLabel value="pc" control={<Radio id="pc" />} label="PC" />
                    </RadioGroup>
                    <Button className="marginButton" onClick={this.getFilteredTrades} variant="contained" color="primary">Filter!</Button>
                    <Button onClick={this.getAllTrades} variant="contained" color="secondary">Remove filter</Button>
                </div>
                <div id="editForm" className="editForm">
                    <br /><br/>
                    {/*<label>I offer...</label><br />*/}
                    <TextField className="textfield" id="offers" label="I offer..." placeholder={this.state.offers}></TextField><br /><br/>
                    {/*<label>In trade for...</label><br />*/}
                    <TextField className="textfield" id="wants" label="In trade for..." placeholder={this.state.wants}></TextField>
                    <br /><br/>
                    <Button className="marginButton" variant="contained" color="primary" onClick={this.editTrade}>Edit trade {this.state.tradeId}</Button>
                    <Button variant="contained" color="secondary" onClick={this.cancelEdit}>Cancel</Button>
                </div>
            </div>
        );
    }
}

export default Overview;

