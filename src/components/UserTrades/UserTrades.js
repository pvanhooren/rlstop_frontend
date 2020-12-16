import React from "react";
import axios from 'axios';

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import ForumIcon from "@material-ui/icons/Forum";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

import "../Overview.css";
import "../userSelection.css";

const baseUrl = "http://localhost:8080/";

class UserTrades extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tradeId: 0,
            busy: false,
            trades: [],
            interests: [],
            wants: "",
            offers: ""
        }
    }

    isLoggedIn() {
        if (localStorage.getItem('token') != null & localStorage.getItem('token') !== "") {
            return true
        } else {
            return false
        }
    }

    getUserTrades() {
        axios.get(baseUrl + "trades/user?id=" + localStorage.getItem('userId'), {
                headers: {
                    withCredentials: true,
                    authorization: 'Bearer ' + localStorage.getItem("token")
                }
            }
        ).then(
            result => {
                this.setState({trades: result.data})
            }
        ).catch((e) => {
            if (e.response == null) {
                console.log(e);
                // document.getElementById('serverError').style.display = 'block';
            } else {
                document.getElementById('noTrades').style.display = 'block';
                this.setState({trades: []})
            }
        })
    }

    async showInterests(tradeId) {
        if (!this.state.busy) {
            this.setState({tradeId: tradeId, busy: true})
            const self = this;

            await axios.get(baseUrl + "interests/trade?id=" + tradeId, {
                headers: {
                    withCredentials: true,
                    authorization: 'Bearer ' + localStorage.getItem("token")
                }
            }).then((response) => {
                self.setState({interests: response.data})
                document.getElementById("view" + tradeId).style.display = "none";
                document.getElementById("interests" + tradeId).style.display = "block";
            }).catch((e) => {
                if (e.response == null) {
                    document.getElementById('serverError').style.display = 'block';
                } else {
                    this.setState({interests: []})
                    document.getElementById("view" + tradeId).style.display = "none";
                    document.getElementById("noInterests" + tradeId).style.display = "block";
                }
            })
        }
    }

    showEditForm(trade) {
        if (!this.state.busy) {
            console.log(trade);
            this.setState({tradeId: trade.tradeId, wants: trade.wants, offers: trade.offers, busy: true})
            document.getElementById("edit" + trade.tradeId).style.display = "block";
            document.getElementById("view" + trade.tradeId).style.display = "none";
            document.getElementById("offers" + trade.tradeId).value = trade.offers;
            document.getElementById("wants" + trade.tradeId).value = trade.wants;
        }
    }

    showDeleteForm(tradeId) {
        if (!this.state.busy) {
            this.setState({tradeId: tradeId, busy: true})
            document.getElementById("delete" + tradeId).style.display = "block";
            document.getElementById("view" + tradeId).style.display = "none";
        }
    }

    editTrade = async () => {
        const self = this;
        if (document.getElementById("wants" + self.state.tradeId).value !== "" && document.getElementById("offers" + self.state.tradeId).value !== "") {
            await axios.put(baseUrl + "trades/" + self.state.tradeId + "?wants=" + document.getElementById("wants" + self.state.tradeId).value + "&offers=" + document.getElementById("offers" + self.state.tradeId).value + "&userId=" + localStorage.getItem('userId'), null, {
                headers: {
                    withCredentials: true,
                    authorization: 'Bearer ' + localStorage.getItem("token")
                }
            }).catch((e) => {
                document.getElementById('serverError').style.display = 'block'
            });
            //console.log("http://localhost:8080/trades/" + self.state.tradeId + "?wants=" + document.getElementById("wants").value + "&offers=" + document.getElementById("offers").value + "&userId=" + self.state.userId);
            document.getElementById("edit" + self.state.tradeId).style.display = "none";
            document.getElementById("view" + self.state.tradeId).style.display = "block";
            self.setState({busy: false})
            await this.getUserTrades();
        } else {
            alert("The trade cannot be edited because it is not complete. Please fill in the empty fields.")
        }
    }

    deleteTrade = async () => {
        await axios.delete(baseUrl + "trades/" + this.state.tradeId, {
                headers: {
                    withCredentials: true,
                    authorization: 'Bearer ' + localStorage.getItem("token")
                }
            }
        ).catch((e) => {
            alert("Something went wrong deleting this trade. Please try again!")
        })

        this.setState({busy: false})
        await this.getUserTrades();
    }

    cancelInterests = () => {
        this.setState({interests: [], busy: false})
        document.getElementById("interests" + this.state.tradeId).style.display = "none";
        document.getElementById("view" + this.state.tradeId).style.display = "block";
    }

    cancelNoInterests = () => {
        console.log(this.state.tradeId);
        this.setState({busy: false})
        document.getElementById("noInterests" + this.state.tradeId).style.display = "none";
        document.getElementById("view" + this.state.tradeId).style.display = "block";
    }

    cancelEdit = () => {
        this.setState({busy: false})
        document.getElementById("edit" + this.state.tradeId).style.display = "none";
        document.getElementById("view" + this.state.tradeId).style.display = "block";
    }

    cancelDelete = () => {
        this.setState({busy: false})
        document.getElementById("delete" + this.state.tradeId).style.display = "none";
        document.getElementById("view" + this.state.tradeId).style.display = "block";
    }

    componentDidMount() {
        if (this.isLoggedIn()) {
            this.getUserTrades();
        } else {
            this.props.history.push("/me/login")
        }
    }

    render() {
        return (
            <div>
                <div className="mainArea" id="userTrades">
                    <h2 className="title">Your trades</h2>
                    <div className="serverError" id="serverError">
                        It looks like something went wrong on our end, our apologies for the inconvenience. Please try
                        again later!
                    </div>
                    {this.state.trades.map(trade =>
                        <Card className="tradeCard" variant="outlined">
                            <CardContent>
                                <div className="view" id={"view" + trade.tradeId}>
                                    <div className="cardText">
                                        <Typography color="textSecondary" gutterBottom>
                                            {trade.lastModified.substring(0, 10)}, {trade.lastModified.substring(11, 16)}

                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                            Offers: {trade.offers} -
                                            Wants: {trade.wants}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            {trade.user.userName} ({trade.user.platform})
                                        </Typography>
                                    </div>
                                    <div className="icons">
                                        <DeleteIcon className="icon2" color={this.state.busy ? "disabled" : "secondary"}
                                                    fontSize="large" cursor="pointer"
                                                    onClick={() => this.showDeleteForm(trade.tradeId)}/>
                                        <CreateIcon className="icon1" color={this.state.busy ? "disabled" : "primary"}
                                                    fontSize="large" cursor="pointer"
                                                    onClick={() => this.showEditForm(trade)}/>
                                        <ForumIcon className="icon3" color={this.state.busy ? "disabled" : "primary"}
                                                   fontSize="large" cursor="pointer"
                                                   onClick={() => this.showInterests(trade.tradeId)}/>
                                    </div>
                                </div>

                                <div className="editForm" id={"edit" + trade.tradeId}>
                                    <div className="editTextFields">
                                        <Typography color="textSecondary" gutterBottom>
                                            {trade.user.userName}
                                        </Typography>
                                        <TextField className="marginField" id={"offers" + trade.tradeId}
                                                   label="Offers..." InputLabelProps={{shrink: true}}></TextField>
                                        <TextField id={"wants" + trade.tradeId} label="In trade for..."
                                                   InputLabelProps={{shrink: true}}></TextField>
                                    </div>

                                    <div className="icons">
                                        <ClearIcon color="secondary" fontSize="large" cursor="pointer" className="icon2"
                                                   onClick={this.cancelEdit}/>
                                        <CheckIcon color="primary" fontSize="large" cursor="pointer" className="icon1"
                                                   onClick={this.editTrade}/>
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
                                            {trade.user.userName} ({trade.user.platform})
                                        </Typography>
                                    </div>
                                    <div className="icons">
                                        <ClearIcon color="secondary" fontSize="large" cursor="pointer" className="icon2"
                                                   onClick={this.cancelDelete}/>
                                        <CheckIcon color="primary" fontSize="large" cursor="pointer" className="icon1"
                                                   onClick={this.deleteTrade}/>
                                    </div>
                                </div>

                                <div className="interests" id={"interests" + trade.tradeId}>
                                    <div className="interestsText">
                                        <Typography color="textSecondary" gutterBottom>
                                            Offers: {trade.offers} - Wants: {trade.wants}
                                        </Typography>
                                        {this.state.interests.map(interest =>
                                            <Typography color="textPrimary">
                                                {interest.user.userName} : {interest.comment} ({interest.user.platform} ID: {interest.user.platformID})
                                            </Typography>
                                        )}
                                    </div>
                                    <div className="icons">
                                        <ClearIcon color="secondary" fontSize="large" cursor="pointer"
                                                   onClick={this.cancelInterests}/>
                                    </div>
                                </div>

                                <div className="noInterests" id={"noInterests" + trade.tradeId}>
                                    <Typography variant="h5" component="h2" className="interestsText">
                                        There are currently no players interested in this trade.
                                    </Typography>
                                    <div className="icons">
                                        <ClearIcon color="secondary" fontSize="large" cursor="pointer"
                                                   onClick={this.cancelNoInterests}/>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                    <div className="nothingToDisplay" id="noTrades">
                        It seems like you have not posted any trades yet. Click the button below to change this!
                        <br/><br/><Button variant="contained" color="primary"
                                          onClick={() => this.props.history.push("/new")}>Post new trade</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserTrades;