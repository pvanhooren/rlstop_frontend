import React from "react";
import axios from 'axios';

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

import "../Overview.css";
import "../userSelection.css";

const baseUrl= "http://localhost:8080/";

class UserTrades extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            tradeId: 0,
            trades: [],
            wants: "",
            offers: ""
        }
    }

    getUserTrades() {
        if(localStorage.getItem("userId") != null) {
            axios.get(baseUrl + "trades/user?id=" + localStorage.getItem('userId'), {
                headers : {
                    withCredentials: true,
                    authorization: 'Basic ' + localStorage.getItem("creds")
                }}
                ).then(
                result => {
                    this.setState({trades: result.data})
                }
            ).catch((e) => {
                if(e.response.status != '404') {
                    this.props.history.push("/me/login");
                } else {
                    document.getElementById('noTrades').style.display = 'block';
                }
            })
        } else {
            this.props.history.push("/me/login");
        }
    }

    showEditForm(trade) {
        console.log(trade);
        this.setState({ tradeId: trade.tradeId, wants: trade.wants, offers: trade.offers})
        document.getElementById("edit" + trade.tradeId).style.display = "block";
        document.getElementById("view" + trade.tradeId).style.display = "none";
        document.getElementById("offers" + trade.tradeId).value = trade.offers;
        document.getElementById("wants" + trade.tradeId).value = trade.wants;
    }

    showDeleteForm(tradeId){
        this.setState({ tradeId: tradeId})
        document.getElementById("delete" + tradeId).style.display = "block";
        document.getElementById("view" + tradeId).style.display = "none";
    }

    editTrade = async() =>{
        const self = this;
        if(document.getElementById("wants" + self.state.tradeId).value !== "" && document.getElementById("offers" + self.state.tradeId).value !== "") {
            await axios.put(baseUrl + "trades/" + self.state.tradeId + "?wants=" + document.getElementById("wants" + self.state.tradeId).value + "&offers=" + document.getElementById("offers" + self.state.tradeId).value + "&userId=" + localStorage.getItem('userId'), null, {
                headers : {
                    withCredentials: true,
                    authorization: 'Basic ' + localStorage.getItem("creds")
                }}).catch((e) => {
                    alert("Something went wrong editing the trade. Please try again!");
            } );
            //console.log("http://localhost:8080/trades/" + self.state.tradeId + "?wants=" + document.getElementById("wants").value + "&offers=" + document.getElementById("offers").value + "&userId=" + self.state.userId);
            document.getElementById("edit" + self.state.tradeId).style.display = "none";
            document.getElementById("view" + self.state.tradeId).style.display = "block";
            await this.getUserTrades();
        } else {
            alert("The trade cannot be edited because it is not complete. Please fill in the empty fields.")
        }
    }

    async deleteTrade(){
        await axios.delete(baseUrl + "trades/" + this.state.tradeId, {
            headers : {
                withCredentials: true,
                authorization: 'Basic ' + localStorage.getItem("creds")
            }}
        ).catch((e) => {
            alert("The trade couldn't be deleted, please try again!")
        })

        await this.getUserTrades();
    }

    cancelEdit = () => {
        document.getElementById("edit" + this.state.tradeId).style.display = "none";
        document.getElementById("view" + this.state.tradeId).style.display = "block";
    }

    cancelDelete = () => {
        document.getElementById("delete" + this.state.tradeId).style.display = "none";
        document.getElementById("view" + this.state.tradeId).style.display = "block";
    }

    componentDidMount(){
        this.getUserTrades();
    }

    render(){
        return(
            <div>
                <div className="mainArea" id="userTrades">
                    <h2 className="title">Your trades</h2>
                    {this.state.trades.map(trade =>
                        <Card className="tradeCard" variant="outlined">
                            <CardContent>
                        <div className="view" id={"view" + trade.tradeId}>
                                <div className="cardText">
                                    <Typography color="textSecondary" gutterBottom>
                                        {trade.user.userName}
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        Offers: {trade.offers} -
                                        Wants: {trade.wants}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {trade.user.platform} ID: {trade.user.platformID}
                                    </Typography>
                                </div>
                                <div className="icons">
                                    {/*<Button variant="contained" color="primary" onClick={() => this.showEditForm(trade)}>Edit</Button>*/}
                                    {/*<Button variant="contained" color="secondary" onClick={() => this.deleteTrade(trade.postId)}>Delete</Button>*/}

                                    <DeleteIcon className="icon2" color="secondary" fontSize="large" cursor="pointer" onClick={() => this.showDeleteForm(trade.tradeId)} />
                                    <CreateIcon className="icon1" color="primary" fontSize="large" cursor="pointer" onClick={() => this.showEditForm(trade)} />
                                </div>
                        </div>
                                <div className="editForm" id={"edit" + trade.tradeId}>
                                    <div className="editTextFields">
                                    <Typography color="textSecondary" gutterBottom>
                                        {trade.user.userName}
                                    </Typography>
                                        <TextField className="marginField" id={"offers" + trade.tradeId} label="Offers..." InputLabelProps={{shrink: true}}></TextField>
                                        <TextField id={"wants" + trade.tradeId} label="In trade for..." InputLabelProps={{shrink: true}}></TextField>
                                    </div>

                                    <div className="icons">
                                        <ClearIcon color="secondary" fontSize="large" cursor="pointer" className="icon2" onClick={this.cancelEdit}/>
                                        <CheckIcon color="primary" fontSize="large" cursor="pointer" className="icon1" onClick={this.editTrade}/>
                                    </div>
                                </div>

                                <div className="deleteForm" id={"delete" + trade.tradeId}>
                                    <div className="deleteText">
                                    <Typography color="textSecondary" gutterBottom>
                                        Are you sure you want to delete this trade?
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        Offers: {trade.offers} -
                                        Wants: {trade.wants}
                                    </Typography>
                                        <Typography color="textSecondary">
                                            {trade.user.platform} ID: {trade.user.platformID}
                                        </Typography>
                                    </div>
                                    <div className="icons">
                                        <ClearIcon color="secondary" fontSize="large" cursor="pointer" className="icon2" onClick={this.cancelDelete}/>
                                        <CheckIcon color="primary" fontSize="large" cursor="pointer" className="icon1" onClick={this.deleteTrade}/>
                                    </div>
                                </div>
                            </CardContent>
                            {/*<CardActions>*/}

                            {/*</CardActions>*/}
                        </Card>
                    )}
                    <div className="noTrades" id="noTrades">
                        It seems like you have not posted any trades yet. Click the button below to change this!
                        <br/><br/><Button variant="contained" color="primary" onClick={() => this.props.history.push("/new")}>Post new trade</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserTrades;