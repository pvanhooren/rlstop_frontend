import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";

import "../Overview.css";
import "../userSelection.css";

class UserTrades extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            userId: 0,
            tradeId: 0,
            trades: [],
            wants: "",
            offers: ""
        }
    }

    getAllUsers(){
        fetch("http://localhost:8080/users/all").then(rse => rse.json()).then(
            result => {
                this.setState({users: result})
            }
        )
    }

    selectUser = () =>{
        this.setState({userId: document.getElementById("userSelect").value});
        document.getElementById("userTrades").style.display = "block";

        fetch("http://localhost:8080/trades/user?id=" + document.getElementById("userSelect").value).then(rse => rse.json()).then(
            result => {
                this.setState({trades: result})
            }
        )
    }

    showEditForm(trade) {
        this.setState({ tradeId: trade.postId, userId: trade.user.userId, wants: trade.wants, offers: trade.offers})
        document.getElementById("editForm").style.display = "block";
    }

    editTrade = () =>{
        const self = this;
        if(document.getElementById("wants").value != "" && document.getElementById("offers").value != "") {
            fetch("http://localhost:8080/trades/" + self.state.tradeId + "?wants=" + document.getElementById("wants").value + "&offers=" + document.getElementById("offers").value + "&userId=" + self.state.userId, {method: 'PUT'});
            //console.log("http://localhost:8080/trades/" + self.state.tradeId + "?wants=" + document.getElementById("wants").value + "&offers=" + document.getElementById("offers").value + "&userId=" + self.state.userId);
            document.getElementById("editForm").style.display = "none";
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

    componentDidMount(){
        this.getAllUsers();
    }

    render(){
        return(
            <div>
                <div className="selectArea">
                    <h2>Your wishlist</h2>
                    <label>I am...</label>
                    <select className="userSelect" id="userSelect" name="user">
                        {this.state.users.map(el => <option value={el.userId} key={el.userId}> {el.userName} </option>)}
                    </select>
                    <Button className="marginBtn" onClick={this.selectUser} variant="contained" color="primary">Confirm</Button>
                    <br/><br/>
                </div>
                    <div id="editForm" className="editForm">
                        <br /><br/>
                        <label className="label1">I offer...</label>
                        <label className="label2">In trade for...</label><br/>
                        <div className="editTextFields">
                            <TextField className="textField1" id="offers" label={this.state.offers}></TextField>
                            <TextField className="textField2" id="wants" label={this.state.wants}></TextField>
                        </div>
                        <br /><br/>
                        <div className="btnGroup">
                            <Button className="marginButton" variant="contained" color="primary" onClick={this.editTrade}>Edit trade</Button>
                            <Button variant="contained" color="secondary" onClick={this.cancelEdit}>Cancel</Button>
                        </div>
                    </div>
                <div className="AreaToMakeVisible" id="userTrades">
                    <br/>
                    {this.state.trades.map(trade =>
                        <Card variant="outlined">
                            <CardContent>
                                <div className="cardText">
                                    <Typography color="textSecondary" gutterBottom>
                                        {trade.user.userName}
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        Wants: {trade.wants} -
                                        Offers: {trade.offers}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {trade.user.platform} ID: {trade.user.platformID}
                                    </Typography>
                                </div>
                                <div className="icons">
                                    {/*<Button variant="contained" color="primary" onClick={() => this.showEditForm(trade)}>Edit</Button>*/}
                                    {/*<Button variant="contained" color="secondary" onClick={() => this.deleteTrade(trade.postId)}>Delete</Button>*/}

                                    <DeleteIcon className="icon2" color="secondary" fontSize="large" cursor="pointer" onClick={() => this.deleteTrade(trade.postId)} />
                                    <CreateIcon className="icon1" color="primary" fontSize="large" cursor="pointer" onClick={() => this.showEditForm(trade)} />
                                </div>

                            </CardContent>
                            {/*<CardActions>*/}

                            {/*</CardActions>*/}
                        </Card>
                    )}
                </div>
            </div>
        );
    }
}

export default UserTrades;